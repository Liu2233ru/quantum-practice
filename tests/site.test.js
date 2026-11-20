import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import test from "node:test";
import vm from "node:vm";
import {bank, byId, legacyById} from "../src/bank/index.js";
import {chapters, levelNames, typeNames} from "../src/chapters.js";
import {buildPaper, createSession, earnedFor, freshData, paperOptions, paperTotal, pointsFor, readData, recordAnswer, recordGrade, sameAnswer, scoreSession, tally} from "../src/engine.js";

const vendor = vm.createContext({});
vm.runInContext(readFileSync(new URL("../vendor/katex/katex.min.js", import.meta.url), "utf8"), vendor);
const katex = vendor.katex;
const sampleScore = question => question.parts.map((part, index) => index ? part.points : .5);
const random = () => .37;
const total = ids => ids.reduce((sum, id) => sum + pointsFor(byId.get(id)), 0);

test("全部大题有逐步得分标注，保留分章覆盖并验证正则数学渲染", () => {
  assert.equal(bank.length, byId.size);
  assert.equal(legacyById.size, 168);
  for (const chapter of chapters) {
    const questions = bank.filter(q => q.chapter === chapter.id);
    assert.ok(questions.filter(q => q.type === "judgment").length >= 2, chapter.id);
    assert.ok(questions.filter(q => q.type === "written").length >= 6, chapter.id);
    assert.ok(questions.filter(q => q.type === "written" && q.source).length >= 3, chapter.id);
  }
  for (const q of bank) {
    assert.ok(chapters.some(ch => ch.id === q.chapter) && q.id.startsWith(q.chapter + "-"), q.id);
    assert.ok(levelNames.includes(q.difficulty) && Object.hasOwn(typeNames, q.type), q.id);
    assert.ok(q.topic && q.prompt && q.hint, q.id);
    assert.ok(Number.isInteger(pointsFor(q)) && pointsFor(q) > 0 && pointsFor(q) < paperTotal, q.id);
    const rubric = [];
    if (q.type === "written") {
      assert.ok(q.parts.length >= 2, q.id);
      for (const part of q.parts) {
        assert.ok(part.label && part.steps.length >= 2, q.id + " " + part.label);
        assert.ok(part.steps.every(step => Number.isInteger(step.points) && step.points > 0 && step.text.trim().length > 20), q.id + " " + part.label);
        assert.equal(part.points, part.steps.reduce((sum, step) => sum + step.points, 0), q.id);
        rubric.push(part.label, ...part.steps.map(step => step.text));
      }
      if (q.source) {
        assert.ok(q.source.label && q.source.ref, q.id);
        if (q.source.page !== undefined) assert.ok(Number.isInteger(q.source.page) && q.source.page > 0, q.id);
      }
    } else {
      const options = q.type === "judgment" ? 2 : 4;
      assert.ok(q.explanation, q.id);
      assert.equal(q.options.length, options, q.id);
      assert.equal(new Set(q.options).size, options, q.id);
      assert.equal(new Set(q.answer).size, q.answer.length, q.id);
      assert.ok(q.answer.every(i => Number.isInteger(i) && i >= 0 && i < q.options.length), q.id);
      assert.ok(q.type === "multiple" ? q.answer.length > 1 : q.answer.length === 1, q.id);
    }
    for (const text of [q.prompt, q.hint, q.explanation ?? "", ...(q.options ?? []), ...rubric]) {
      const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^\n$]+?\$)/g);
      parts.forEach((part, i) => {
        if (i % 2 === 0) assert.ok(!part.includes("$"), q.id + " " + part);
        else {
          const offset = part.startsWith("$$") ? 2 : 1;
          assert.doesNotThrow(() => katex.renderToString(part.slice(offset, -offset), {
            strict: "error", displayMode: offset === 2,
          }), q.id + " " + part);
        }
      });
    }
  }
});

test("难题和多步题使用细分分值，客观题分值随难度递增", () => {
  const written = bank.filter(q => q.type === "written");
  assert.ok(new Set(written.map(pointsFor)).size >= 10);
  const mean = level => {
    const questions = written.filter(q => q.difficulty === level);
    return questions.reduce((sum, q) => sum + pointsFor(q), 0) / questions.length;
  };
  assert.ok(mean("基础") < mean("进阶") && mean("进阶") < mean("挑战"));
  for (const type of ["judgment", "single", "multiple"]) {
    const scores = levelNames.map(level => bank.find(q => q.type === type && q.difficulty === level)).map(pointsFor);
    assert.deepEqual(scores, [scores[0], scores[0] + 1, scores[0] + 2]);
  }
});

test("跨章按原分值组卷，任意可选题量均恰好为 100", () => {
  const main = bank.filter(q => q.chapter.startsWith("g"));
  const written = main.filter(q => q.type === "written");
  for (const pool of [written, main, main.filter(q => q.type === "judgment")]) {
    const {counts, closest} = paperOptions(pool);
    assert.equal(closest, 100);
    assert.ok(counts.length);
    for (const count of [0, counts[0], counts.at(-1)]) {
      const ids = buildPaper(pool, count, "random", random);
      assert.equal(total(ids), 100);
      assert.equal(new Set(ids).size, ids.length);
      assert.ok(ids.every(id => pool.includes(byId.get(id))));
      if (count) assert.equal(ids.length, count);
    }
  }
  const allowed = written.filter(q => ["g02", "g03", "g04"].includes(q.chapter));
  const ordered = buildPaper(allowed, 0, "ordered");
  assert.equal(total(ordered), 100);
  assert.deepEqual(ordered, allowed.filter(q => ordered.includes(q.id)).map(q => q.id));
});

test("组卷不足时说明最大可达分数，选中的题不可重复使用或改分", () => {
  const pool = [
    {id: "a", chapter: "g01", type: "single", points: 36},
    {id: "b", chapter: "g02", type: "single", points: 32},
    {id: "c", chapter: "g03", type: "single", points: 27},
  ];
  assert.deepEqual(paperOptions(pool), {counts: [], closest: 95});
  assert.deepEqual(buildPaper(pool, 0, "ordered"), []);
  assert.deepEqual(paperOptions([{...pool[0], points: 50}]), {counts: [], closest: 50});
  assert.deepEqual(paperOptions([...pool, {id:"e", chapter:"g01", type:"single", points: 5}]), {counts: [4], closest: 100});
});

test("同等题量与题源条件下优先覆盖不同章节", () => {
  const pool = [["a26", "g01", 26], ["b26", "g02", 26], ["a24", "g01", 24], ["a25", "g01", 25], ["a25b", "g01", 25]]
    .map(([id, chapter, points]) => ({id, chapter, points, type: "written"}));
  assert.deepEqual(buildPaper(pool, 4, "ordered"), ["b26", "a24", "a25", "a25b"]);
});

test("小问给分、限幅、错题订正及旧分值还原", () => {
  const q = bank.find(item => item.id === "g01-w1");
  const legacy = legacyById.get(q.id);
  const scores = sampleScore(q);
  const data = freshData();
  data.session = createSession([q.id], "推导练习", 1);
  assert.equal(recordGrade(data, q, [q.parts[0].points + .5, ...scores.slice(1)], 2), false);
  assert.equal(recordGrade(data, q, [1.1, ...scores.slice(1)], 2), false);
  assert.equal(recordGrade(data, q, scores, 2), true);
  assert.equal(data.stats[q.id].pending, true);
  assert.deepEqual(scoreSession(data.session, byId), {earned: scores.reduce((a, b) => a + b), possible: pointsFor(q)});
  assert.deepEqual(readData(JSON.stringify(data), byId, legacyById), data);
  data.session.answers[q.id].scores[0] = -1;
  assert.throws(() => readData(JSON.stringify(data), byId, legacyById), /小问得分/);

  data.session = createSession([q.id], "旧版组卷", 3, 1);
  delete data.session.scoring;
  const oldScores = sampleScore(legacy);
  assert.equal(recordGrade(data, legacy, oldScores, 4), true);
  const loaded = readData(JSON.stringify(data), byId, legacyById);
  assert.equal(loaded.session.scoring, 1);
  assert.equal(earnedFor(legacy, loaded.session.answers[q.id]), oldScores.reduce((a, b) => a + b));
  assert.equal(scoreSession(loaded.session, legacyById).possible, 20);
  for (const part of legacy.parts) assert.equal(part.steps.reduce((a, b) => a + b.points, 0), part.points);
  data.session = createSession([q.id], "订正", 5);
  assert.equal(recordGrade(data, q, q.parts.map(part => part.points), 6), true);
  assert.equal(data.stats[q.id].pending, false);
});

test("客观题判分、跳题和备份往返", () => {
  const q = bank.find(item => item.type === "multiple");
  const written = bank.find(item => item.type === "written");
  assert.equal(sameAnswer([...q.answer].reverse(), q.answer), true);
  assert.equal(sameAnswer(q.answer.slice(1), q.answer), false);
  const data = freshData();
  data.session = createSession([q.id, written.id], "试练", 1);
  data.session.drafts[q.id] = [...q.answer];
  data.session.drafts[written.id] = "草稿";
  assert.equal(recordAnswer(data, q, false, 2), true);
  assert.equal(recordAnswer(data, q, false, 3), false);
  assert.equal(data.stats[q.id].pending, true);
  assert.deepEqual(tally(data.session), {answered: 1, correct: 0, skipped: 1});
  assert.deepEqual(readData(JSON.stringify(data), byId, legacyById), data);
  data.session = createSession([q.id], "错题复练", 4);
  assert.equal(recordAnswer(data, q, true, 5), true);
  assert.deepEqual(data.stats[q.id], {attempts: 2, misses: 1, pending: false, last: 5});
  assert.throws(() => readData('{"version":2,"stats":{}}', byId, legacyById), /不兼容/);
});

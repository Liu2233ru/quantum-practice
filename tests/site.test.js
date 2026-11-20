import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import test from "node:test";
import vm from "node:vm";
import {partA} from "../src/bank/part-a.js";
import {partB} from "../src/bank/part-b.js";
import {extra} from "../src/bank/extra.js";
import {gradedLegacy} from "../src/bank/rubrics.js";
import {judgments} from "../src/bank/judgments.js";
import {bookA} from "../src/bank/book-a.js";
import {bookB} from "../src/bank/book-b.js";
import {bookExtra} from "../src/bank/book-extra.js";
import {chapters, levelNames, typeNames} from "../src/chapters.js";
import {buildPreset, buildSet, createSession, earnedFor, freshData, missingPresetPoints, pointsFor, presets, readData, recordAnswer, recordGrade, sameAnswer, scoreSession, tally} from "../src/engine.js";

const textbook = [...bookA, ...bookB, ...bookExtra];
const bank = [...partA, ...partB, ...extra, ...gradedLegacy, ...judgments, ...textbook];
const byId = new Map(bank.map(q => [q.id, q]));
const vendor = vm.createContext({});
vm.runInContext(readFileSync(new URL("../vendor/katex/katex.min.js", import.meta.url), "utf8"), vendor);
const katex = vendor.katex;

test("题库结构、章节覆盖与公式渲染", () => {
  assert.equal(bank.length, byId.size);
  for (const chapter of chapters) {
    const questions = bank.filter(q => q.chapter === chapter.id);
    assert.ok(questions.some(q => q.type === "judgment"), chapter.id);
    assert.ok(questions.filter(q => q.type === "written" && q.source).length >= 2, chapter.id);
  }
  for (const q of bank) {
    assert.ok(chapters.some(ch => ch.id === q.chapter) && q.id.startsWith(q.chapter + "-"), q.id);
    assert.ok(levelNames.includes(q.difficulty) && Object.hasOwn(typeNames, q.type), q.id);
    assert.ok(q.topic && q.prompt && q.hint && q.explanation, q.id);
    if (q.type === "written") {
      assert.ok([10, 20, 30, 40].includes(pointsFor(q)), q.id);
      assert.ok(q.parts.length >= 2 && q.parts.every(p => p.label && p.criterion && Number.isInteger(p.points) && p.points > 0), q.id);
      if (q.source) {
        assert.ok(q.source.label && q.source.ref, q.id);
        if (q.source.page !== undefined) assert.ok(Number.isInteger(q.source.page) && q.source.page > 0, q.id);
      }
    } else {
      const options = q.type === "judgment" ? 2 : 4;
      assert.equal(q.options.length, options, q.id);
      assert.equal(new Set(q.options).size, options, q.id);
      assert.equal(new Set(q.answer).size, q.answer.length, q.id);
      assert.ok(q.answer.every(i => Number.isInteger(i) && i >= 0 && i < q.options.length), q.id);
      assert.ok(q.type === "multiple" ? q.answer.length > 1 : q.answer.length === 1, q.id);
    }
    const rubric = q.parts?.flatMap(part => [part.label, part.criterion]) ?? [];
    for (const text of [q.prompt, q.hint, q.explanation, ...(q.options ?? []), ...rubric]) {
      const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^\n$]+?\$)/g);
      parts.forEach((part, i) => {
        if (i % 2 === 0) assert.ok(!part.includes("$"), q.id + " " + part);
        else {
          const offset = part.startsWith("$$") ? 2 : 1;
          assert.doesNotThrow(() => katex.renderToString(part.slice(offset, -offset), {strict: "error"}), q.id + " " + part);
        }
      });
    }
  }
});

test("两种模板各选四道不同教材大题，总分恰好为 100", () => {
  const main = bank.filter(q => q.chapter.startsWith("g"));
  for (const preset of Object.values(presets)) {
    assert.deepEqual(missingPresetPoints(main, preset), []);
    for (const order of ["ordered", "random"]) {
      const ids = buildPreset(main, preset, order, () => 0.37);
      assert.equal(new Set(ids).size, 4);
      assert.deepEqual(ids.map(id => pointsFor(byId.get(id))), preset);
      assert.ok(ids.every(id => byId.get(id).source && !byId.get(id).source.ref.includes("改编")));
    }
  }
  const twenty = main.find(q => q.type === "written" && pointsFor(q) === 20);
  assert.deepEqual(missingPresetPoints([twenty], presets.balanced), [20, 30, 30]);
  assert.deepEqual(buildPreset([twenty], presets.balanced, "ordered"), []);
});

test("小问给分保存、限幅、未满分收录及旧记录兼容", () => {
  const q = gradedLegacy[0];
  const scores = q.parts.map(part => part.points);
  const data = freshData();
  data.session = createSession([q.id], "推导练习", 1);
  assert.equal(recordGrade(data, q, [scores[0] + .5, ...scores.slice(1)], 2), false);
  assert.equal(recordGrade(data, q, [1.1, ...scores.slice(1)], 2), false);
  assert.equal(recordGrade(data, q, [1.5, ...scores.slice(1)], 2), true);
  assert.equal(data.stats[q.id].pending, true);
  assert.deepEqual(scoreSession(data.session, byId), {earned: 16.5, possible: 20});
  assert.deepEqual(readData(JSON.stringify(data), byId), data);
  data.session.answers[q.id].scores[0] = -1;
  assert.throws(() => readData(JSON.stringify(data), byId), /小问得分/);
  data.session = createSession([q.id], "保存的 V1 旧练习", 3);
  assert.equal(recordAnswer(data, q, true, 4), true);
  assert.equal(earnedFor(q, readData(JSON.stringify(data), byId).session.answers[q.id]), 20);
  assert.equal(data.stats[q.id].pending, false);
});

test("跨章抽题优先覆盖每章并且不重复", () => {
  const active = bank.filter(q => ["g01", "g02", "e04"].includes(q.chapter));
  for (const order of ["random", "ordered"]) {
    const ids = buildSet(active, 6, order, () => .27);
    assert.equal(new Set(ids).size, 6);
    assert.deepEqual(new Set(ids.map(id => byId.get(id).chapter)), new Set(["g01", "g02", "e04"]));
    assert.equal(buildSet(active, 100, order, () => .27).length, active.length);
  }
  const ordered = buildSet(active, 6, "ordered");
  assert.deepEqual(ordered, active.filter(q => ordered.includes(q.id)).map(q => q.id));
  assert.deepEqual(buildSet([], 3, "random"), []);
});

test("判分、错题订正、跳题和备份往返", () => {
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
  assert.deepEqual(readData(JSON.stringify(data), byId), data);
  data.session = createSession([q.id], "错题复练", 4);
  assert.equal(recordAnswer(data, q, true, 5), true);
  assert.deepEqual(data.stats[q.id], {attempts: 2, misses: 1, pending: false, last: 5});
  assert.throws(() => readData('{"version":2,"stats":{}}', byId), /不兼容/);
});

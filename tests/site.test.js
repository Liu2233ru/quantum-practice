import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import test from "node:test";
import vm from "node:vm";
import {partA} from "../src/bank/part-a.js";
import {partB} from "../src/bank/part-b.js";
import {extra} from "../src/bank/extra.js";
import {writtenA} from "../src/bank/written-a.js";
import {writtenB} from "../src/bank/written-b.js";
import {writtenExtra} from "../src/bank/written-extra.js";
import {chapters, levelNames, typeNames} from "../src/chapters.js";
import {buildSet, createSession, freshData, readData, recordAnswer, sameAnswer, tally} from "../src/engine.js";

const bank = [...partA, ...partB, ...extra, ...writtenA, ...writtenB, ...writtenExtra];
const byId = new Map(bank.map(q => [q.id, q]));
const vendor = vm.createContext({});
vm.runInContext(readFileSync(new URL("../vendor/katex/katex.min.js", import.meta.url), "utf8"), vendor);
const katex = vendor.katex;

test("题库结构、章节覆盖与公式渲染", () => {
  assert.equal(bank.length, byId.size);
  for (const chapter of chapters) {
    const questions = bank.filter(q => q.chapter === chapter.id);
    assert.equal(questions.length, chapter.page ? 6 : 5, chapter.id);
    assert.equal(questions.filter(q => q.type === "written").length, 1, chapter.id);
  }
  for (const q of bank) {
    assert.ok(chapters.some(ch => ch.id === q.chapter) && q.id.startsWith(q.chapter + "-"), q.id);
    assert.ok(levelNames.includes(q.difficulty) && Object.hasOwn(typeNames, q.type), q.id);
    assert.ok(q.topic && q.prompt && q.hint && q.explanation, q.id);
    if (q.type !== "written") {
      assert.equal(q.options.length, 4, q.id);
      assert.equal(new Set(q.options).size, 4, q.id);
      assert.equal(new Set(q.answer).size, q.answer.length, q.id);
      assert.ok(q.answer.every(i => Number.isInteger(i) && i >= 0 && i < q.options.length), q.id);
      assert.ok(q.type === "single" ? q.answer.length === 1 : q.answer.length > 1, q.id);
    }
    for (const text of [q.prompt, q.hint, q.explanation, ...(q.options ?? [])]) {
      const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^\n$]+?\$)/g);
      parts.forEach((part, i) => {
        if (i % 2 === 0) assert.ok(!part.includes("$"), q.id + " " + part);
        else {
          const offset = part.startsWith("$$") ? 2 : 1;
          assert.doesNotThrow(() => katex.renderToString(part.slice(offset, -offset), {strict: "ignore"}), q.id + " " + part);
        }
      });
    }
  }
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

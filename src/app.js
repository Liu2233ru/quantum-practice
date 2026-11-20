import {chapterById, chapters, groups} from "./chapters.js?v=1.1";
import {partA} from "./bank/part-a.js";
import {partB} from "./bank/part-b.js";
import {extra} from "./bank/extra.js";
import {gradedLegacy} from "./bank/rubrics.js";
import {judgments} from "./bank/judgments.js";
import {bookA} from "./bank/book-a.js";
import {bookB} from "./bank/book-b.js";
import {bookExtra} from "./bank/book-extra.js";
import {buildPreset, buildSet, createSession, earnedFor, freshData, missingPresetPoints, pointsFor, presets, readData, recordAnswer, recordGrade, sameAnswer, scoreSession, storageKey, studyPriority, tally} from "./engine.js?v=1.1";
import {drawWave, escape} from "./display.js";
import {bankPage, button, chapterPage, choices, customPage, empty, explanation, heading, hint, home, link, navigation, questionHeader, questionRow, rubric, wrongPage} from "./pages.js?v=1.1";

const source = [...bookA, ...bookB, ...bookExtra, ...gradedLegacy, ...judgments, ...partA, ...partB, ...extra];
const bank = chapters.flatMap(chapter => source.filter(question => question.chapter === chapter.id)
  .sort((a, b) => studyPriority(a) - studyPriority(b)));
const byId = new Map(bank.map(question => [question.id, question]));
const view = document.querySelector("#view");
const main = document.querySelector("#main");
const dialog = document.querySelector("#dialog");
const feedback = document.querySelector("#feedback");
const upload = document.querySelector("#import-file");
const titles = {chapters: "章节练习", custom: "自由组卷", bank: "题库全览", wrong: "错题本", session: "正在练习", results: "练习小结"};
let data = freshData();
let afterConfirm = null;
let openHint = false;
let writtenRevealed = false;
let waveObserver;

try {
  const saved = localStorage.getItem(storageKey);
  if (saved) data = readData(saved, byId);
} catch {
  storageWarning("读取学习记录失败。请检查浏览器存储或导入以前的备份。");
}

function storageWarning(message) {
  const warning = document.querySelector("#storage-warning");
  warning.hidden = false;
  warning.textContent = message;
}

function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch {
    storageWarning("当前无法保存到浏览器。请在离开前通过「学习数据」导出备份。");
  }
}

function tell(message) {
  feedback.textContent = message;
}

function go(target) {
  if (location.hash !== "#" + target) location.hash = target;
  else render(true);
}

function route() {
  const [name, id] = location.hash.slice(1).split("/");
  if (name === "chapter" && Object.hasOwn(chapterById, id)) return {name, chapter: chapterById[id]};
  return {name: Object.hasOwn(titles, name) ? name : "chapters"};
}

function render(moveFocus = false) {
  waveObserver?.disconnect();
  const {name, chapter} = route();
  const pending = Object.values(data.stats).filter(entry => entry.pending).length;
  const active = name === "chapter" ? "chapters" : name;
  document.querySelector("#nav").innerHTML = navigation(active, pending);
  document.querySelector("#location").textContent = chapter?.title ?? titles[name];

  if (name === "chapters") view.innerHTML = home(bank, data);
  if (name === "chapter") view.innerHTML = chapterPage(chapter, bank.filter(question => question.chapter === chapter.id));
  if (name === "custom") view.innerHTML = customPage();
  if (name === "bank") view.innerHTML = bankPage();
  if (name === "wrong") view.innerHTML = wrongPage(data);
  if (name === "session") view.innerHTML = data.session?.finished ? results() : sessionPage();
  if (name === "results") view.innerHTML = data.session?.finished ? results() : sessionPage();

  const canvas = view.querySelector("canvas");
  if (canvas) {
    drawWave(canvas);
    waveObserver = new ResizeObserver(() => drawWave(canvas));
    waveObserver.observe(canvas);
  }
  updateConfig();
  updateBank();
  updateWrong();
  if (moveFocus) {
    window.scrollTo(0, 0);
    main.focus({preventScroll: true});
  }
}

function configState() {
  const form = document.querySelector("#config");
  if (!form) return null;
  const values = new FormData(form);
  const selected = values.getAll("chapter");
  const level = values.get("level");
  const type = values.get("type");
  const mode = values.get("mode");
  const preset = Object.hasOwn(presets, mode) ? presets[mode] : null;
  const pool = bank.filter(q => selected.includes(q.chapter) &&
    (!level || level === q.difficulty) && (preset ? q.type === "written" : !type || type === q.type) &&
    (!values.has("unseen") || !data.stats[q.id]));
  return {form, selected, pool, preset, count: Number(values.get("count")), order: values.get("order")};
}

function updateConfig() {
  const state = configState();
  if (!state) return;
  const countInput = state.form.elements.count;
  const maximum = state.pool.length;
  const eligible = new Set(state.pool.map(q => q.chapter)).size;
  const missing = state.preset ? missingPresetPoints(state.pool, state.preset) : [];
  const free = !state.preset;
  document.querySelector("#free-options").hidden = !free;
  countInput.disabled = !free;
  state.form.elements.type.disabled = !free;
  countInput.max = Math.max(1, maximum);
  document.querySelector("#assemble").disabled = free ? maximum === 0 || !countInput.validity.valid : !!missing.length;
  document.querySelector("#assemble").textContent = free ? "开始练习" : "生成 100 分大题卷";
  const absent = state.selected.length - eligible;
  const detail = missing.length ? ` · 仍缺 ${missing.map(points => points + " 分题").join("、")}，请扩大范围或切换分值方案`
    : free && state.count > maximum && maximum ? ` · 请将题量改为 ${maximum} 或以下` : "";
  document.querySelector("#eligible").textContent = `${maximum} 道可选 · 覆盖 ${eligible} 个章节或专题${absent ? ` · ${absent} 个已选范围无符合条件的题` : ""}${detail}`;
}

function updateBank() {
  const form = document.querySelector("#bank-filters");
  if (!form) return;
  const filters = new FormData(form);
  const query = filters.get("query").trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matches = bank.filter(q => {
    const chapter = chapterById[q.chapter];
    const text = [q.id, q.topic, q.prompt, chapter.title, chapter.description, q.source?.label, q.source?.ref].join(" ").toLowerCase();
    const origin = q.source ? "book" : "site";
    return query.every(token => text.includes(token)) &&
      (!filters.get("chapter") || filters.get("chapter") === q.chapter) &&
      (!filters.get("level") || filters.get("level") === q.difficulty) &&
      (!filters.get("type") || filters.get("type") === q.type) &&
      (!filters.get("source") || filters.get("source") === origin);
  });
  document.querySelector("#bank-count").textContent = `${matches.length} 道题`;
  document.querySelector("#bank-list").innerHTML = matches.length
    ? matches.map(q => questionRow(q)).join("")
    : empty("没有匹配的题目", "试试其他关键词或放宽筛选条件。");
}

function wrongMatches(state = "all", chapter = "") {
  return bank.filter(q => {
    const record = data.stats[q.id];
    return record?.misses && (!chapter || chapter === q.chapter) &&
      (state === "all" || record.pending === (state === "pending"));
  }).sort((a, b) => data.stats[b.id].last - data.stats[a.id].last);
}

function updateWrong() {
  const form = document.querySelector("#wrong-filters");
  if (!form) return;
  const filters = new FormData(form);
  const matches = wrongMatches(filters.get("state"), filters.get("chapter"));
  document.querySelector("#wrong-count").textContent = `${matches.length} 道题`;
  document.querySelector("#wrong-list").innerHTML = matches.length
    ? matches.map(q => questionRow(q, data.stats[q.id], "wrong")).join("")
    : empty("当前筛选下没有错题", "可切换订正状态或章节查看其他记录。");
}

function showDialog(title, html) {
  if (dialog.open) dialog.close();
  dialog.innerHTML = `<div class="dialog-head"><h2 id="dialog-title">${title}</h2><form method="dialog"><button class="btn small" type="submit" aria-label="关闭弹窗">关闭</button></form></div>${html}`;
  dialog.showModal();
}

function confirm(title, detail, label, task) {
  afterConfirm = task;
  showDialog(title, `<p>${detail}</p><div class="actions">${button(label, "confirm", "", "primary")}${button("取消", "cancel")}</div>`);
}

function start(ids, title) {
  if (!ids.length) {
    showDialog("没有可练习的题目", "<p>可切换章节或调整筛选条件。</p>");
    return;
  }
  const launch = () => {
    data.session = createSession(ids, title);
    openHint = writtenRevealed = false;
    save();
    go("session");
  };
  const current = data.session;
  if (current && !current.finished) {
    confirm("开始新练习？", "已提交的作答会保留。当前练习的未提交草稿和题目顺序会被替换。", "开始新练习", launch);
  } else {
    if (dialog.open) dialog.close();
    launch();
  }
}

function currentQuestion() {
  return byId.get(data.session?.ids[data.session.position]);
}

function sessionPage() {
  const session = data.session;
  if (!session) return empty("还没有进行中的练习", "选择章节或自定组卷开始。", link("选章节", "#chapters", "primary"));
  const q = currentQuestion();
  const result = session.answers[q.id];
  const draft = session.drafts[q.id];
  const written = q.type === "written";
  const position = session.position;
  const total = session.ids.length;
  const current = tally(session);
  const scores = scoreSession(session, byId);
  const direction = q.type === "multiple" ? "多选题，可选择多个选项。" : q.type === "judgment" ? "判断题干中的陈述是否正确。" : "选择一个答案后提交。";
  const review = written && (writtenRevealed || result);
  const writer = `<label class="field"><span>推导草稿（可选）</span><textarea id="draft" maxlength="4000" placeholder="记下关键等式和推导步骤" ${result ? "readonly" : ""}>${escape(draft ?? "")}</textarea></label>`;
  return heading(escape(session.label), `第 ${position + 1} / ${total} 题 · 已答 ${current.answered} 题`) + `
    <div class="session-grid">
      <article class="panel flow">
        ${questionHeader(q)}${written ? writer : `<p class="meta">${direction}</p>${choices(q, draft ?? [], !!result)}`}
        ${hint(q, openHint)}
        ${result || review ? explanation(q, result) + rubric(q, result, !result && written) : ""}
        ${!result && written && !review ? button("查看解析并自评", "reveal-written", "", "primary") : ""}
        ${!result && !written ? `<button type="button" class="btn primary" data-action="answer" ${draft?.length ? "" : "disabled"}>提交答案</button>` : ""}
        <div class="actions session-actions">
          <button type="button" class="btn" data-action="position" data-value="${position - 1}" ${position === 0 ? "disabled" : ""}>上一题</button>
          ${position + 1 === total ? button("结束练习", "finish", "", result ? "primary" : "") : button("下一题", "position", position + 1, result ? "primary" : "")}
        </div>
      </article>
      <aside class="panel"><h2>作答进度</h2><div class="question-nav">${session.ids.map((id, i) => {
        const item = session.answers[id];
        const status = item ? item.correct ? "正确" : "待订正" : "未判定";
        const tone = item ? item.correct ? "pass" : "fail" : "";
        return `<button type="button" class="btn ${tone} ${i === position ? "active" : ""}" data-action="position" data-value="${i}" aria-label="第 ${i + 1} 题，${status}" ${i === position ? 'aria-current="step"' : ""}>${i + 1}</button>`;
      }).join("")}</div><p class="meta">已得 ${scores.earned} / ${scores.possible} 分 · 未判定 ${current.skipped} 题</p>
      ${position + 1 !== total ? `<div class="actions session-actions">${button("结束练习", "finish", "", "small")}</div>` : ""}</aside>
    </div>`;
}

function results() {
  const session = data.session;
  if (!session) return empty("暂无练习小结", "先完成一次练习即可查看小结。", link("选章节", "#chapters", "primary"));
  const count = tally(session);
  const score = scoreSession(session, byId);
  return heading("练习小结", `${escape(session.label)} · 共 ${session.ids.length} 道题`, link("回到章节练习", "#chapters")) +
    `<section class="panel flow"><p class="result-score"><strong>${score.earned}</strong> / ${score.possible} 分</p><p>已答 <strong>${count.answered}</strong>　满分 <strong>${count.correct}</strong>　待订正 <strong>${count.answered - count.correct}</strong>　未判定 <strong>${count.skipped}</strong></p>
    <div class="actions">${link("打开错题本", "#wrong", "primary")}${link("重新组卷", "#custom")}</div>
    <div class="list">${session.ids.map(id => {
      const q = byId.get(id);
      const answer = session.answers[id];
      const status = answer ? answer.correct ? "满分" : "待订正" : "未判定";
      const points = answer ? `${earnedFor(q, answer)} / ${pointsFor(q)} 分` : `满分 ${pointsFor(q)} 分`;
      return `<article class="card list-item"><div class="list-label"><h3>${escape(q.topic)}</h3><p>${status} · ${points}</p></div>${button("看解析", "review-result", id, "small")}</article>`;
    }).join("")}</div></section>`;
}

function review(q, result = null) {
  showDialog("题目与解析", questionHeader(q) + choices(q, [], true) + hint(q) +
    explanation(q, result) + rubric(q, result) + `<div class="actions">${button("练此题", "start-one", q.id, "primary")}</div>`);
}

function showAnswerResult() {
  const result = data.session.answers[currentQuestion().id];
  save();
  tell(result.correct ? "本题得满分。" : "已加入错题本。");
  render();
  view.querySelector(".analysis")?.setAttribute("tabindex", "-1");
  view.querySelector(".analysis")?.focus();
}

function clearData() {
  try {
    localStorage.removeItem(storageKey);
  } catch {
    showDialog("暂时无法删除记录", "<p>浏览器未允许访问本地存储，请检查站点权限后再试。</p>");
    return;
  }
  resetProgress();
  tell("已删除本地记录。");
}

function resetProgress() {
  data = freshData();
  openHint = writtenRevealed = false;
  document.querySelector("#storage-warning").hidden = true;
  go("chapters");
}

function exportData() {
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {type: "application/json"}));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "quantum-practice-backup.json";
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function actions(action, value) {
  const session = data.session;
  const question = currentQuestion();
  if (action === "review") review(byId.get(value));
  if (action === "review-result") review(byId.get(value), session?.answers[value]);
  if (action === "start-one") start([value], "单题练习");
  if (action === "start-wrong") start(wrongMatches("pending").map(q => q.id), "错题复练");
  if (["start-chapter", "chapter-unseen", "chapter-short"].includes(action)) {
    const short = action === "chapter-short";
    const unseen = action === "chapter-unseen";
    const ids = bank.filter(q => q.chapter === value && (q.type !== "written") === short && (!unseen || !data.stats[q.id])).map(q => q.id);
    start(ids, chapterById[value].title + (short ? " · 概念与选择" : unseen ? " · 未做大题" : " · 章节大题"));
  }
  if (action === "toggle-chapters" || action === "toggle-group") {
    const ids = action === "toggle-group" ? groups[Number(value)].chapters.map(([id]) => id) : [];
    document.querySelectorAll('#config [name="chapter"]').forEach(input => {
      if (action === "toggle-chapters" || ids.includes(input.value)) input.checked = value !== "none";
    });
    updateConfig();
  }
  if (action === "position" && session && !session.finished) {
    const position = Number(value);
    if (position < 0 || position >= session.ids.length || position === session.position) return;
    session.position = position;
    openHint = writtenRevealed = false;
    save();
    render(true);
  }
  if (action === "choice" && question && !session.answers[question.id]) {
    const index = Number(value);
    const old = session.drafts[question.id] ?? [];
    session.drafts[question.id] = question.type !== "multiple" ? [index]
      : old.includes(index) ? old.filter(item => item !== index) : [...old, index];
    save();
    render();
    view.querySelector(`.choice[data-value="${index}"]`)?.focus({preventScroll: true});
  }
  if (action === "answer" && question && session.drafts[question.id]?.length && question.answer) {
    if (recordAnswer(data, question, sameAnswer(session.drafts[question.id], question.answer))) showAnswerResult();
  }
  if (action === "reveal-written" && question?.type === "written") {
    writtenRevealed = true;
    render();
    view.querySelector('[name="part-score"]')?.focus();
  }
  if (action === "fill-score") {
    view.querySelectorAll('#grade-form [name="part-score"]').forEach(input => { input.value = input.max; });
  }
  if (action === "finish" && session) {
    const finish = () => { session.finished = true; save(); go("results"); };
    const {skipped} = tally(session);
    if (skipped) confirm("结束本次练习？", `还有 ${skipped} 题未提交或未自评，这些题会标为未判定。`, "结束练习", finish);
    else finish();
  }
  if (action === "data") showDialog("学习数据", `<p>学习记录与练习草稿保存在当前浏览器。更换设备前可以导出备份。</p>
    <div class="actions">${button("导出备份", "export", "", "primary")}${button("导入备份", "import")}${button("删除本地记录", "clear-data", "", "danger")}</div>`);
  if (action === "export") exportData();
  if (action === "import") upload.click();
  if (action === "clear-data") confirm("删除本地学习记录？", "将清空此浏览器中的做题进度、错题、自评分和草稿。已导出的备份仍可导入。", "确认删除", clearData);
  if (action === "confirm") {
    const task = afterConfirm;
    afterConfirm = null;
    dialog.close();
    task?.();
  }
  if (action === "cancel") dialog.close();
}

document.addEventListener("click", event => {
  const target = event.target.closest("[data-action]");
  if (target && !target.disabled) actions(target.dataset.action, target.dataset.value ?? "");
  if (event.target.closest(".skip")) { event.preventDefault(); main.focus(); }
});
document.addEventListener("submit", event => {
  if (event.target.id === "bank-filters" || event.target.id === "wrong-filters") event.preventDefault();
  if (event.target.id === "config") {
    event.preventDefault();
    const {pool, count, order, preset} = configState();
    if (preset) {
      const ids = buildPreset(pool, preset, order);
      if (ids.length) start(ids, "100 分大题卷 · " + preset.join(" / "));
      return;
    }
    if (!Number.isInteger(count) || count < 1 || count > pool.length) return;
    start(buildSet(pool, count, order), "自由组卷");
  }
  if (event.target.id === "grade-form") {
    event.preventDefault();
    if (!writtenRevealed || !event.target.reportValidity()) return;
    const scores = [...event.target.querySelectorAll('[name="part-score"]')].map(input => input.valueAsNumber);
    if (recordGrade(data, currentQuestion(), scores)) showAnswerResult();
  }
});
document.addEventListener("input", event => {
  if (event.target.closest("#config")) updateConfig();
  if (event.target.closest("#bank-filters")) updateBank();
  if (event.target.closest("#wrong-filters")) updateWrong();
  if (event.target.id === "draft" && data.session && !data.session.finished) {
    data.session.drafts[currentQuestion().id] = event.target.value;
    save();
  }
});
document.addEventListener("toggle", event => {
  if (event.target.matches("#view .hint")) openHint = event.target.open;
}, true);
upload.addEventListener("change", async () => {
  const file = upload.files[0];
  upload.value = "";
  if (!file) return;
  try {
    if (file.size > 2_000_000) throw new Error("备份文件过大。");
    const restored = readData(await file.text(), byId);
    confirm("导入学习备份？", "导入会替换当前浏览器已有的练习进度和错题记录。", "确认导入", () => {
      data = restored;
      openHint = writtenRevealed = false;
      save();
      tell("学习备份已导入。");
      go("chapters");
    });
  } catch (error) {
    showDialog("备份导入失败", `<p>${escape(error instanceof SyntaxError ? "请选择有效的 JSON 备份。" : error.message)}</p>`);
  }
});
window.addEventListener("hashchange", () => render(true));
window.addEventListener("storage", event => {
  if (event.storageArea === localStorage && (event.key === null || event.key === storageKey) && event.newValue === null) resetProgress();
});
render();

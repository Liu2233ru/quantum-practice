import {chapterById, chapters, groups, levelNames, typeNames} from "./chapters.js?v=1.2";
import {escape, icon, rich} from "./display.js";
import {earnedFor, pointsFor} from "./engine.js?v=1.2";

const navItems = {chapters: "章节练习", custom: "自由组卷", bank: "题库全览", wrong: "错题本"};
export function navigation(active, pending) {
  return Object.entries(navItems).map(([key, title]) => `
    <a class="nav-link" href="#${key}" ${active === key ? 'aria-current="page"' : ""}>
      ${icon(key)} <span>${title}</span>${key === "wrong" && pending ? `<span class="nav-count" aria-label="${pending} 道待订正">${pending}</span>` : ""}
    </a>`).join("");
}

export const button = (label, action, value = "", kind = "") =>
  `<button class="btn ${kind}" type="button" data-action="${action}" data-value="${escape(value)}">${label}</button>`;
export const link = (label, href, kind = "") =>
  `<a class="btn ${kind}" href="${href}">${label}</a>`;

export function heading(title, description = "", action = "", eyebrow = "") {
  return `<div class="page-head"><div>${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
    <h1>${title}</h1>${description ? `<p>${description}</p>` : ""}</div>${action}</div>`;
}

export function empty(title, description, action = "") {
  return `<div class="panel empty"><h3>${title}</h3><p>${description}</p>${action ? `<div class="actions">${action}</div>` : ""}</div>`;
}

export function tag(text, className = "") {
  return `<span class="tag ${className}">${text}</span>`;
}

function metric(name, value, glyph) {
  return `<div class="metric"><div class="metric-icon">${icon(glyph)}</div><div><strong>${value}</strong><span>${name}</span></div></div>`;
}

export function home(bank, data) {
  const pending = Object.values(data.stats).filter(item => item.pending).length;
  return `<section class="hero">
    <div class="hero-copy"><p class="eyebrow">格里菲斯《量子力学概论》· 第 3 版</p><h1>量子力学练习册</h1>
    <p>逐章练习教材大题，对照每步推导和得分点自评。可跨章组满 100 分。</p>
    <div class="actions">${link("组 100 分大题卷", "#custom", "hero-primary")}${link("开始第 1 章", "#chapter/g01", "hero-secondary")}</div></div>
    <figure class="hero-art"><canvas role="img" aria-label="高斯波包的实部与其上下包络"></canvas><figcaption>高斯波包 · 实部与包络</figcaption></figure>
  </section>
  ${data.session ? `<div class="notice resume"><span>${escape(data.session.label)} · 已答 ${Object.keys(data.session.answers).length} / ${data.session.ids.length} 题</span>${data.session.finished ? link("查看上次小结", "#results", "small") : link("继续练习", "#session", "small")}</div>` : ""}
  <div class="metrics">${metric("推导大题", bank.filter(q => q.type === "written").length, "bank")}${metric("已做题目", Object.keys(data.stats).length, "done")}${metric("待订正", pending, "wrong")}</div>
  ${groups.map(group => `<section><div class="section-head"><h2>${group.title}</h2><p>${group.chapters.length} ${group.title === "补充专题" ? "个专题" : "章"}</p></div>
    <div class="chapter-grid">${group.chapters.map(([id, label, title, description]) => {
      const available = bank.filter(question => question.chapter === id);
      const done = available.filter(question => data.stats[question.id]).length;
      const percent = available.length ? 100 * done / available.length : 0;
      return `<a class="card chapter-card" href="#chapter/${id}">
        <div class="chapter-top"><span class="chapter-index">${label}</span><span>${available.filter(q => q.type === "written").length} 道大题</span></div>
        <h3>${title}</h3><p>${description}</p>
        <div class="chapter-foot"><span>已做 ${done} / ${available.length}</span><span class="track" aria-hidden="true"><span style="width:${percent}%"></span></span></div></a>`;
    }).join("")}</div></section>`).join("")}`;
}

function select(name, label, items, all) {
  return `<label class="field"><span>${label}</span><select name="${name}">${all ? `<option value="">${all}</option>` : ""}
    ${items.map(([value, text]) => `<option value="${value}">${text}</option>`).join("")}</select></label>`;
}
const levels = levelNames.map(level => [level, level]);
const types = Object.entries(typeNames);
const chapterOptions = chapters.map(ch => [ch.id, `${ch.label} · ${ch.title}`]);

export function customPage() {
  return heading("自由组卷", "从所选范围抽题，保留每题原分值，卷面总分恰好 100 分。练习不限时。") + `
  <form id="config" class="panel flow">
    <div class="config-controls">
      ${select("type", "题型", [types[0], ["", "混合题型"], ...types.slice(1)])}
      ${select("level", "难度", levels, "全部难度")}
      ${select("count", "题量", [["0", "自动选题"]])}
      ${select("order", "抽题方式", [["random", "随机抽题"], ["ordered", "按题库顺序选题"]])}
      <label class="check-inline"><input name="unseen" type="checkbox">跳过已做</label>
    </div>
    <div class="config-actions"><button id="assemble" type="submit" class="btn primary">生成 100 分练习卷</button><p class="meta" id="eligible" role="status"></p></div>
    <fieldset><legend>练习范围</legend>
      <div class="actions">${button("全选", "toggle-chapters", "all", "small")}${button("清除选择", "toggle-chapters", "none", "small")}</div>
      ${groups.map((group, index) => `<div class="config-group">
        <div class="section-head"><h3>${group.title}</h3><button type="button" class="text-button" data-action="toggle-group" data-value="${index}">选择本组</button></div>
        <div class="chapter-selection">${group.chapters.map(([id,label,title]) => `
          <label class="chapter-choice"><input name="chapter" type="checkbox" value="${id}" ${id.startsWith("g") ? "checked" : ""}><span>${label} · ${title}</span></label>`).join("")}</div></div>`).join("")}
    </fieldset>
  </form>`;
}

export function chapterPage(chapter, items) {
  const location = chapter.page ? `中文第 3 版 · 正文第 ${chapter.page} 页起` : "补充专题";
  const long = items.filter(q => q.type === "written");
  const short = items.filter(q => q.type !== "written");
  return heading(chapter.title, chapter.description, link("全部章节", "#chapters"), `${chapter.label} · ${location}`) + `
  <div class="panel flow">
    <div class="actions">${button(`练习本章 ${long.length} 道大题`, "start-chapter", chapter.id, "primary")}
      ${button("只做未做大题", "chapter-unseen", chapter.id)}${button("练习概念与选择", "chapter-short", chapter.id)}</div>
    <h2 class="bank-group-title">推导大题</h2><div class="list">${long.map(q => questionRow(q)).join("")}</div>
    <h2 class="bank-group-title">概念与选择</h2><div class="list">${short.map(q => questionRow(q)).join("")}</div>
  </div>`;
}

export function bankPage() {
  return heading("题库全览", "按章节、知识点、教材题号或题型查找。") + `
    <div class="panel flow"><form id="bank-filters" class="filters">
      <label class="field search"><span>搜索</span><input type="search" name="query" placeholder="如 谐振子、贝尔、g02"></label>
      ${select("chapter", "章节", chapterOptions, "全部章节")}${select("level", "难度", levels, "全部难度")}${select("type", "题型", types, "全部题型")}
      ${select("source", "来源", [["book", "教材习题与改编"], ["site", "站内原创"]], "全部来源")}
    </form><p class="meta" id="bank-count" role="status"></p><div class="list" id="bank-list"></div></div>`;
}

export function wrongPage(data) {
  const tracked = Object.values(data.stats).filter(entry => entry.misses);
  const pending = tracked.filter(entry => entry.pending).length;
  return heading("错题本", "答错或未得满分的题自动收录。复练得满分后标记为已订正。", pending ? button("复练全部待订正", "start-wrong", "", "primary") : "") + (
    tracked.length ? `<div class="panel flow"><form id="wrong-filters" class="filters">
      ${select("state", "订正状态", [["pending", `待订正（${pending}）`], ["corrected", `已订正（${tracked.length - pending}）`], ["all", "全部"]])}
      ${select("chapter", "章节", chapterOptions, "全部章节")}
    </form><p class="meta" id="wrong-count" role="status"></p><div class="list" id="wrong-list"></div></div>`
      : empty("还没有错题", "完成练习后，这里会显示需要回顾的习题。", link("去章节练习", "#chapters", "primary"))
  );
}

export function questionRow(question, record = null, mode = "") {
  const chapter = chapterById[question.chapter];
  const id = question.id;
  const status = record?.misses && mode === "wrong"
    ? tag(record.pending ? "待订正" : "已订正", record.pending ? "pending" : "corrected") + ` <span>错过 ${record.misses} 次</span>` : "";
  return `<article class="card list-item"><div class="list-label"><h3>${escape(question.topic)}</h3>
    <p>${chapter.label} · ${typeNames[question.type]} · ${question.difficulty} · ${pointsFor(question)} 分 ${status}</p>
    ${question.source ? `<p>${sourceText(question.source)}</p>` : ""}</div>
    <div class="actions">${button("看解析", "review", id, "small")}${button(mode === "wrong" ? "重新做" : "练此题", "start-one", id, "small")}</div>
    </article>`;
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const letter = index => letters[index];

function sourceText(source) {
  return escape([source.label, source.ref, source.page ? `正文第 ${source.page} 页` : ""].filter(Boolean).join(" · "));
}

export function questionHeader(question) {
  const chapter = chapterById[question.chapter];
  return `<div class="tags">${tag(`${chapter.label} · ${chapter.title}`)}${tag(typeNames[question.type])}${tag(question.difficulty)}${tag(`${pointsFor(question)} 分`)}</div>
    <h2 class="prompt-title">${escape(question.topic)}</h2>${question.source ? `<p class="meta source-note">${sourceText(question.source)}</p>` : ""}
    <div class="rich">${rich(question.prompt)}</div>
    ${question.parts ? `<ul class="part-outline" aria-label="小问分值">${question.parts.map(part => `<li>${rich(part.label)} <strong>${part.points} 分</strong></li>`).join("")}</ul>` : ""}`;
}

export function choices(question, selected = [], reveal = false) {
  if (!question.options) return "";
  return `<ol class="choices" aria-label="作答选项">${question.options.map((option, index) => {
    const chosen = selected.includes(index);
    const isAnswer = reveal && question.answer.includes(index);
    const status = isAnswer ? chosen ? "正确 · 已选" : "正确选项" : reveal && chosen ? "误选" : "";
    const style = isAnswer ? "pass" : chosen && reveal ? "fail" : chosen ? "chosen" : "";
    return `<li><button type="button" class="choice ${style}" data-action="choice" data-value="${index}" ${reveal ? "disabled" : `aria-pressed="${chosen}"`}>
      <span class="choice-letter">${letter(index)}</span><span class="rich">${rich(option)}</span><span class="choice-state">${status}</span>
    </button></li>`;
  }).join("")}</ol>`;
}

export function hint(question, open = false) {
  return `<details class="hint" ${open ? "open" : ""}><summary>看提示</summary><div class="rich">${rich(question.hint)}</div></details>`;
}

export function explanation(question, result = null) {
  const maximum = pointsFor(question);
  const score = result ? `${earnedFor(question, result)} / ${maximum} 分` : "";
  if (question.parts) {
    return result ? `<section class="analysis"><h3 class="${result.correct ? "status-pass" : "status-fail"}">${result.correct ? "满分" : "需要订正"} · ${score}</h3></section>` : "";
  }
  const header = result ? (result.correct ? "满分" : "需要订正") + " · " + score : "参考解析";
  const answer = question.type === "judgment" ? escape(question.options[question.answer[0]]) : question.answer.map(letter).join("、");
  return `<section class="analysis"><h3 class="${result ? result.correct ? "status-pass" : "status-fail" : ""}">${header}</h3>
    <p class="meta">参考答案 ${answer} · ${question.type === "multiple" ? "选项完全匹配" : "答案正确"}得 ${maximum} 分</p><div class="rich">${rich(question.explanation)}</div></section>`;
}

export function rubric(question, result = null, grading = false) {
  if (!question.parts) return "";
  const items = question.parts.map(({label, points, steps}, index) => {
    const score = result?.scores?.[index];
    const name = rich(label);
    return `<li class="rubric-part"><div class="rubric-title"><h3>${name} · ${points} 分</h3>
      ${grading ? `<label class="field grade-input"><span>自评分</span><span class="sr-only">${escape(label)}，满分 ${points}</span>
        <input type="number" name="part-score" min="0" max="${points}" step="0.5" required></label>` : score !== undefined ? `<strong class="part-score">${score} / ${points}</strong>` : ""}</div>
      <ol class="work-steps">${steps.map(step => `<li><span class="point-badge">${step.points ? "+" + step.points + " 分" : "核对"}</span><div class="rich">${rich(step.text)}</div></li>`).join("")}</ol></li>`;
  }).join("");
  const details = `<h3 class="rubric-heading" tabindex="-1">逐步解析与得分点</h3>${grading ? '<p class="meta">核对每一步，再给小问评分。支持 0.5 分，未得分的小问填 0。</p>' : ""}<ol class="rubric-list">${items}</ol>`;
  return grading ? `<form id="grade-form" class="rubric">${details}
      <div class="actions"><button type="submit" class="btn primary">保存自评分</button><button type="button" class="btn" data-action="fill-score">填入满分</button></div></form>`
    : `<section class="rubric">${details}</section>`;
}

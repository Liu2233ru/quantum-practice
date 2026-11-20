import {chapterById, chapters, groups, levelNames, typeNames} from "./chapters.js";
import {escape, icon, rich} from "./display.js";

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
    <p>沿教材顺序逐章练习，或自由组合不同章节。每道题都有提示和推导解析。</p>
    <div class="actions">${link("开始第 1 章", "#chapter/g01", "hero-primary")}${link("自由组卷", "#custom", "hero-secondary")}</div></div>
    <figure class="hero-art"><canvas role="img" aria-label="高斯波包的实部与其上下包络"></canvas><figcaption>高斯波包 · 实部与包络</figcaption></figure>
  </section>
  ${data.session ? `<div class="notice resume"><span>${escape(data.session.label)} · 已答 ${Object.keys(data.session.answers).length} / ${data.session.ids.length} 题</span>${data.session.finished ? link("查看上次小结", "#results", "small") : link("继续练习", "#session", "small")}</div>` : ""}
  <div class="metrics">${metric("题库题目", bank.length, "bank")}${metric("已做题目", Object.keys(data.stats).length, "done")}${metric("待订正", pending, "wrong")}</div>
  ${groups.map(group => `<section><div class="section-head"><h2>${group.title}</h2><p>${group.chapters.length} ${group.title === "补充专题" ? "个专题" : "章"}</p></div>
    <div class="chapter-grid">${group.chapters.map(([id, label, title, description]) => {
      const available = bank.filter(question => question.chapter === id);
      const done = available.filter(question => data.stats[question.id]).length;
      const percent = available.length ? 100 * done / available.length : 0;
      return `<a class="card chapter-card" href="#chapter/${id}">
        <div class="chapter-top"><span class="chapter-index">${label}</span><span>${available.length} 题</span></div>
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
  return heading("自由组卷", "任选章节、题型和难度。题量允许时，先为每个有候选题的章节各抽一道。") + `
  <form id="config" class="panel flow">
    <fieldset><legend>练习范围</legend>
      <div class="actions">${button("全选", "toggle-chapters", "all", "small")}${button("清除选择", "toggle-chapters", "none", "small")}</div>
      ${groups.map((group, index) => `<div class="config-group">
        <div class="section-head"><h3>${group.title}</h3><button type="button" class="text-button" data-action="toggle-group" data-value="${index}">选择本组</button></div>
        <div class="chapter-selection">${group.chapters.map(([id,label,title]) => `
          <label class="chapter-choice"><input name="chapter" type="checkbox" value="${id}" ${id === "g01" ? "checked" : ""}><span>${label} · ${title}</span></label>`).join("")}</div></div>`).join("")}
    </fieldset>
    <div class="config-controls">
      ${select("level", "难度", levels, "全部难度")}${select("type", "题型", types, "全部题型")}
      ${select("order", "顺序", [["random", "随机抽题"], ["ordered", "按章节和题序"]])}
      <label class="field"><span>题量</span><input name="count" type="number" min="1" step="1" value="5" required></label>
      <label class="check-inline"><input name="unseen" type="checkbox">跳过已做</label>
    </div>
    <div class="config-actions"><button id="assemble" type="submit" class="btn primary">开始练习</button><p class="meta" id="eligible" role="status"></p></div>
  </form>`;
}

export function chapterPage(chapter, items) {
  const location = chapter.page ? `中文第 3 版 · 正文第 ${chapter.page} 页起` : "补充专题";
  return heading(chapter.title, chapter.description, link("全部章节", "#chapters"), `${chapter.label} · ${location}`) + `
  <div class="panel flow">
    <div class="actions">${button(`练习本章全部 ${items.length} 题`, "start-chapter", chapter.id, "primary")}
      ${button("只做未做题", "chapter-unseen", chapter.id)}</div>
    <div class="list">${items.map(q => questionRow(q)).join("")}</div>
  </div>`;
}

export function bankPage() {
  return heading("题库全览", "按章节、知识点或题型查找，直接查阅提示与解析。") + `
    <div class="panel flow"><form id="bank-filters" class="filters">
      <label class="field search"><span>搜索</span><input type="search" name="query" placeholder="如 谐振子、贝尔、g02"></label>
      ${select("chapter", "章节", chapterOptions, "全部章节")}${select("level", "难度", levels, "全部难度")}${select("type", "题型", types, "全部题型")}
    </form><p class="meta" id="bank-count" role="status"></p><div class="list" id="bank-list"></div></div>`;
}

export function wrongPage(data) {
  const tracked = Object.values(data.stats).filter(entry => entry.misses);
  const pending = tracked.filter(entry => entry.pending).length;
  return heading("错题本", "答错的题自动收录。再次做对后会标记为已订正。", pending ? button("复练全部待订正", "start-wrong", "", "primary") : "") + (
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
    <p>${chapter.label} · ${typeNames[question.type]} · ${question.difficulty} ${status}</p></div>
    <div class="actions">${button("看解析", "review", id, "small")}${button(mode === "wrong" ? "重新做" : "练此题", "start-one", id, "small")}</div>
    </article>`;
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const letter = index => letters[index];

export function questionHeader(question) {
  const chapter = chapterById[question.chapter];
  return `<div class="tags">${tag(`${chapter.label} · ${chapter.title}`)}${tag(typeNames[question.type])}${tag(question.difficulty)}</div>
    <h2 class="prompt-title">${escape(question.topic)}</h2><div class="rich">${rich(question.prompt)}</div>`;
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
  const header = result === null ? "参考解析" : result ? "回答正确" : "需要订正";
  const answer = question.answer ? `<p class="meta">正确选项 ${question.answer.map(letter).join("、")}</p>` : "";
  return `<section class="analysis"><h3 class="${result === null ? "" : result ? "status-pass" : "status-fail"}">${header}</h3>
    ${answer}<div class="rich">${rich(question.explanation)}</div></section>`;
}

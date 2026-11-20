export const storageKey = "quantum-practice.v1";
export const freshData = () => ({version: 1, stats: {}, session: null});
export const sameAnswer = (actual, expected) =>
  actual.length === expected.length && expected.every(index => actual.includes(index));

export const paperTotal = 100;
export const currentScoring = 2;
const typicalWrittenPaperLength = 6;

export function pointsFor(question) {
  return question.parts?.reduce((sum, part) => sum + part.points, 0) ?? question.points ?? (question.type === "multiple" ? 4 : 2);
}

export function studyPriority(question) {
  if (question.source) return question.source.ref.includes("改编") ? 1 : 0;
  if (question.type === "written") return 2;
  return question.type === "judgment" ? 3 : 4;
}

export function earnedFor(question, answer) {
  if (!answer) return 0;
  return answer.scores?.reduce((sum, points) => sum + points, 0) ?? (answer.correct ? pointsFor(question) : 0);
}

export function scoreSession(session, questions) {
  return session.ids.reduce((total, id) => {
    const question = questions.get(id);
    return {earned: total.earned + earnedFor(question, session.answers[id]), possible: total.possible + pointsFor(question)};
  }, {earned: 0, possible: 0});
}

export function shuffled(items, random = Math.random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function paperOptions(pool) {
  const reachable = Array.from({length: paperTotal + 1}, () => new Set());
  reachable[0].add(0);
  for (const question of pool) {
    const points = pointsFor(question);
    if (!Number.isInteger(points) || points < 1 || points > paperTotal) continue;
    for (let total = paperTotal; total >= points; total--) {
      for (const count of reachable[total - points]) reachable[total].add(count + 1);
    }
  }
  return {
    counts: [...reachable[paperTotal]].sort((a, b) => a - b),
    closest: reachable.findLastIndex(counts => counts.size > 0),
  };
}

export function buildPaper(pool, count, order, random = Math.random) {
  const candidates = order === "random" ? shuffled(pool, random) : pool;
  const formatPaths = () => Array.from({length: paperTotal + 1}, () => new Map());
  const completed = formatPaths();
  completed[0].set(0, {quality: 0, breadth: 0});
  const chapters = new Map();
  for (const question of candidates) {
    if (!chapters.has(question.chapter)) chapters.set(question.chapter, []);
    chapters.get(question.chapter).push(question);
  }
  function retainBetter(destination, length, path) {
    const best = destination.get(length);
    if (!best || path.quality > best.quality || (path.quality === best.quality && path.breadth > best.breadth)) {
      destination.set(length, path);
    }
  }
  function extend(destination, previous, question, quality, breadthBonus) {
    for (const [length, path] of previous) {
      if (count && length >= count) continue;
      retainBetter(destination, length + 1, {
        quality: path.quality + quality, breadth: path.breadth + breadthBonus, id: question.id, previous: path,
      });
    }
  }
  for (const questions of chapters.values()) {
    // Keep papers that already include this chapter apart so coverage is rewarded only once.
    const includingChapter = formatPaths();
    for (const question of questions) {
      const points = pointsFor(question);
      if (!Number.isInteger(points) || points < 1 || points > paperTotal) continue;
      const quality = points * (question.type === "written" ? paperTotal + 1 : 0) + (studyPriority(question) === 0 ? points : 0);
      // Descending amounts prevent the same question from entering a paper twice.
      for (let total = paperTotal; total >= points; total--) {
        const destination = includingChapter[total];
        extend(destination, includingChapter[total - points], question, quality, 0);
        extend(destination, completed[total - points], question, quality, 1);
      }
    }
    includingChapter.forEach((paths, total) => {
      for (const [length, path] of paths) retainBetter(completed[total], length, path);
    });
  }
  let selected = completed[paperTotal].get(count);
  if (!count) {
    let bestDistance = Infinity;
    for (const [length, path] of completed[paperTotal]) {
      const distance = Math.abs(length - typicalWrittenPaperLength);
      if (!selected || path.quality > selected.quality || (path.quality === selected.quality &&
        (distance < bestDistance || (distance === bestDistance && path.breadth > selected.breadth)))) {
        selected = path;
        bestDistance = distance;
      }
    }
  }
  const ids = new Set();
  for (let path = selected; path?.id; path = path.previous) ids.add(path.id);
  return candidates.filter(question => ids.has(question.id)).map(question => question.id);
}

export function createSession(ids, label, now = Date.now(), scoring = currentScoring) {
  return {ids, label, started: now, scoring, position: 0, drafts: {}, answers: {}, finished: false};
}

export function recordAnswer(data, question, correct, now = Date.now(), scores) {
  const session = data.session;
  if (!session || session.finished || !session.ids.includes(question.id) || session.answers[question.id]) return false;
  const prior = data.stats[question.id];
  session.answers[question.id] = {correct, at: now};
  if (scores) session.answers[question.id].scores = [...scores];
  data.stats[question.id] = {
    attempts: (prior?.attempts ?? 0) + 1,
    misses: (prior?.misses ?? 0) + Number(!correct),
    pending: !correct,
    last: now,
  };
  return true;
}

function validScores(question, scores) {
  return Array.isArray(scores) && question.parts?.length === scores.length &&
    scores.every((score, index) => Number.isSafeInteger(score * 2) && typeof score === "number" &&
      score >= 0 && score <= question.parts[index].points);
}

export function recordGrade(data, question, scores, now = Date.now()) {
  if (!validScores(question, scores)) return false;
  return recordAnswer(data, question, earnedFor(question, {scores}) === pointsFor(question), now, scores);
}

export function tally(session) {
  const answers = Object.values(session.answers);
  return {
    answered: answers.length,
    correct: answers.filter(answer => answer.correct).length,
    skipped: session.ids.length - answers.length,
  };
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isCount(value) {
  return Number.isSafeInteger(value) && value >= 0;
}

function isDraft(draft, question) {
  if (question.type === "written") return typeof draft === "string" && draft.length <= 4000;
  return Array.isArray(draft) && new Set(draft).size === draft.length &&
    draft.every(index => isCount(index) && index < question.options.length) &&
    (question.type === "multiple" || draft.length <= 1);
}

export function readData(json, questions, legacyQuestions = questions) {
  const data = JSON.parse(json);
  if (data?.version !== 1 || !isObject(data.stats)) throw new Error("备份格式不兼容。");
  const stats = {};
  for (const [id, item] of Object.entries(data.stats)) {
    if (!questions.has(id)) continue;
    if (!item || !isCount(item.attempts) || item.attempts < 1 || !isCount(item.misses) ||
        item.misses > item.attempts || typeof item.pending !== "boolean" ||
        (item.pending && !item.misses) || !isCount(item.last)) throw new Error("备份中有无效的题目记录。");
    stats[id] = {attempts: item.attempts, misses: item.misses, pending: item.pending, last: item.last};
  }
  const input = data.session;
  let session = null;
  if (input && Array.isArray(input.ids) && input.ids.length && input.ids.every(id => questions.has(id))) {
    const scoring = input.scoring ?? 1;
    const sessionQuestions = scoring === 1 ? legacyQuestions : questions;
    if (new Set(input.ids).size !== input.ids.length || typeof input.label !== "string" || input.label.length > 120 ||
        !isCount(input.started) || !isCount(input.position) || input.position >= input.ids.length ||
        typeof input.finished !== "boolean" || !isObject(input.drafts) || !isObject(input.answers) ||
        ![1, currentScoring].includes(scoring) || !input.ids.every(id => sessionQuestions.has(id))) {
      throw new Error("备份中有无效的练习记录。");
    }
    session = createSession([...input.ids], input.label, input.started, scoring);
    session.position = input.position;
    session.finished = input.finished;
    for (const id of session.ids) {
      const draft = input.drafts[id];
      const answer = input.answers[id];
      const question = sessionQuestions.get(id);
      if (draft !== undefined) {
        if (!isDraft(draft, question)) throw new Error("备份中有无效的作答草稿。");
        session.drafts[id] = draft;
      }
      if (answer !== undefined) {
        if (!answer || typeof answer.correct !== "boolean" || !isCount(answer.at)) throw new Error("备份中有无效的答案。");
        session.answers[id] = {correct: answer.correct, at: answer.at};
        if (answer.scores !== undefined) {
          if (!validScores(question, answer.scores) || (earnedFor(question, answer) === pointsFor(question)) !== answer.correct) {
            throw new Error("备份中有无效的小问得分。");
          }
          session.answers[id].scores = [...answer.scores];
        }
      }
    }
  }
  return {version: 1, stats, session};
}

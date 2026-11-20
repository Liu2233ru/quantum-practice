export const storageKey = "quantum-practice.v1";
export const freshData = () => ({version: 1, stats: {}, session: null});
export const sameAnswer = (actual, expected) =>
  actual.length === expected.length && expected.every(index => actual.includes(index));

export const presets = {
  graded: [10, 20, 30, 40],
  balanced: [20, 20, 30, 30],
};

export function pointsFor(question) {
  return question.parts?.reduce((sum, part) => sum + part.points, 0) ?? (question.type === "multiple" ? 4 : 2);
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

export function missingPresetPoints(pool, preset) {
  const counts = new Map();
  for (const question of pool) {
    if (question.type === "written") {
      const points = pointsFor(question);
      counts.set(points, (counts.get(points) ?? 0) + 1);
    }
  }
  return preset.filter(points => {
    const available = counts.get(points) ?? 0;
    counts.set(points, available - 1);
    return available < 1;
  });
}

export function buildPreset(pool, preset, order, random = Math.random) {
  if (missingPresetPoints(pool, preset).length) return [];
  const candidates = order === "random" ? shuffled(pool, random) : pool;
  const buckets = new Map([...new Set(preset)].map(points => [
    points, candidates.filter(question => question.type === "written" && pointsFor(question) === points),
  ]));
  const chosen = [];
  const chapters = new Set();
  let best = [];
  let bestPriority = -1;
  function visit(index, originals) {
    if (index === preset.length) {
      const priority = originals * (preset.length + 1) + chapters.size;
      if (priority > bestPriority) {
        best = chosen.map(question => question.id);
        bestPriority = priority;
      }
      return;
    }
    for (const question of buckets.get(preset[index])) {
      if (chosen.includes(question)) continue;
      const isNewChapter = !chapters.has(question.chapter);
      chosen.push(question);
      chapters.add(question.chapter);
      visit(index + 1, originals + Number(studyPriority(question) === 0));
      chosen.pop();
      if (isNewChapter) chapters.delete(question.chapter);
      if (bestPriority === preset.length * (preset.length + 2)) break;
    }
  }
  visit(0, 0);
  return best;
}

export function shuffled(items, random = Math.random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function buildSet(pool, count, order, random = Math.random) {
  const buckets = new Map();
  for (const question of pool) {
    if (!buckets.has(question.chapter)) buckets.set(question.chapter, []);
    buckets.get(question.chapter).push(question);
  }
  const queues = [...buckets.values()].map(questions => (order === "random" ? shuffled(questions, random) : questions)
    .sort((a, b) => studyPriority(a) - studyPriority(b)).map(question => question.id));
  const round = order === "random" ? shuffled(queues, random) : queues;
  const chosen = new Set();
  while (chosen.size < Math.min(count, pool.length)) {
    for (const queue of round) {
      if (chosen.size >= count) break;
      if (queue.length) chosen.add(queue.shift());
    }
  }
  return order === "random" ? shuffled(chosen, random) : pool.filter(q => chosen.has(q.id)).map(q => q.id);
}

export function createSession(ids, label, now = Date.now()) {
  return {ids, label, started: now, position: 0, drafts: {}, answers: {}, finished: false};
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

export function readData(json, questions) {
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
    if (new Set(input.ids).size !== input.ids.length || typeof input.label !== "string" || input.label.length > 120 ||
        !isCount(input.started) || !isCount(input.position) || input.position >= input.ids.length ||
        typeof input.finished !== "boolean" || !isObject(input.drafts) || !isObject(input.answers)) {
      throw new Error("备份中有无效的练习记录。");
    }
    session = createSession([...input.ids], input.label, input.started);
    session.position = input.position;
    session.finished = input.finished;
    for (const id of session.ids) {
      const draft = input.drafts[id];
      const answer = input.answers[id];
      if (draft !== undefined) {
        if (!isDraft(draft, questions.get(id))) throw new Error("备份中有无效的作答草稿。");
        session.drafts[id] = draft;
      }
      if (answer !== undefined) {
        if (!answer || typeof answer.correct !== "boolean" || !isCount(answer.at)) throw new Error("备份中有无效的答案。");
        session.answers[id] = {correct: answer.correct, at: answer.at};
        if (answer.scores !== undefined) {
          const question = questions.get(id);
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

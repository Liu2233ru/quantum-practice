import {chapters} from "../chapters.js?v=1.2";
import {studyPriority} from "../engine.js?v=1.2";
import {partA} from "./part-a.js";
import {partB} from "./part-b.js";
import {extra} from "./extra.js";
import {bookA} from "./book-a.js";
import {bookB} from "./book-b.js";
import {bookExtra} from "./book-extra.js";
import {gradedLegacy} from "./rubrics.js";
import {judgments} from "./judgments.js";
import {newJudgments} from "./judgments-v12.js";
import {detailedA, newA} from "./detailed-a.js";
import {detailedB, newB} from "./detailed-b.js";
import {detailedExtra, newExtra} from "./detailed-extra.js";

const legacyWritten = [...bookA, ...bookB, ...bookExtra, ...gradedLegacy];
const legacyObjective = [...partA, ...partB, ...extra, ...judgments];
const detailed = {...detailedA, ...detailedB, ...detailedExtra};
const difficultyPoints = {基础: 0, 进阶: 1, 挑战: 2};
const typePoints = {judgment: 2, single: 3, multiple: 4};

function withStepScores(question, parts = question.parts) {
  return {...question, parts: parts.map(part => ({
    ...part,
    points: part.steps.reduce((total, step) => total + step.points, 0),
  }))};
}

function adaptLegacyPart(part, detailedPart) {
  // Preserve the previous ceiling and stored subpart score, including half points.
  const oldUnits = part.points * 2;
  const minimum = oldUnits >= detailedPart.steps.length ? 1 : 0;
  const distributable = oldUnits - minimum * detailedPart.steps.length;
  const weight = detailedPart.steps.reduce((total, step) => total + step.points, 0);
  let assigned = 0;
  let cumulative = 0;
  const steps = detailedPart.steps.map(step => {
    cumulative += step.points;
    const boundary = Math.round(distributable * cumulative / weight);
    const points = (minimum + boundary - assigned) / 2;
    assigned = boundary;
    return {...step, points};
  });
  return {label: detailedPart.label, points: part.points, steps};
}

const written = [
  ...legacyWritten.map(question => withStepScores(question, detailed[question.id].parts)),
  ...[...newA, ...newB, ...newExtra].map(question => withStepScores(question)),
];
const objective = [...legacyObjective, ...newJudgments].map(question => ({
  ...question, points: typePoints[question.type] + difficultyPoints[question.difficulty],
}));
const all = [...written, ...objective];
export const bank = chapters.flatMap(chapter => all.filter(question => question.chapter === chapter.id)
  .sort((a, b) => studyPriority(a) - studyPriority(b)));
export const byId = new Map(bank.map(question => [question.id, question]));
export const legacyById = new Map([
  ...legacyWritten.map(question => [
    question.id, {...question, parts: question.parts.map((part, index) => adaptLegacyPart(part, detailed[question.id].parts[index]))},
  ]),
  ...legacyObjective.map(question => [question.id, question]),
]);

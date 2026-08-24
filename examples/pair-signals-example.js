import {
  evaluateSurvey,
  evaluatePairSignals,
} from "../src/index.js";

// Replace with the 49 values captured by the web app.
const answers = Array(49).fill(3);

const baseResult = evaluateSurvey(answers, {
  autonomyApplicable: true,
});

const layer1 = evaluatePairSignals(baseResult);

console.log("Base profile:");
console.log(baseResult.primaryProfile);

console.log("\nPair signals:");
console.table(
  layer1.signals.map((signal) => ({
    id: signal.id,
    pair: signal.dimensions.join(" × "),
    type: signal.type,
    strength: signal.strength,
    priority: signal.priority,
    patternCandidate: signal.patternCandidate,
  }))
);

console.log("\nInternal centrality ranking (not a psychometric score):");
console.table(layer1.centrality.ranking);

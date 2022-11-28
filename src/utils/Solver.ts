import { solve } from "sat-solver";
export default (text: string): number[] => {
  const textRow = text.split("\n");

  const logic = textRow
    .slice(1)
    .map((row) => {
      const section = row
        .split(" ")
        .slice(0, -1)
        .map((node) => (node[0] === "-" ? `¬N${node.slice(1)}` : `N${node}`))
        .join(" | ");
      return "(" + section + ")";
    })
    .join(" & ");

  const answers = solve(logic).findOne();

  return Object.keys(answers)
    .filter((key) => answers[key])
    .map((filteredKey) => Number(filteredKey.slice(1)));
};

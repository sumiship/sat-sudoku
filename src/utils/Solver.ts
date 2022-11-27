import { solve } from "sat-solver";
export default (text: string): number[][] => {
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

  console.log(logic);

  const answers = solve(logic).findAll();
  // const answers = solve(logic).getAstTree();

  return answers.map((ans: any) =>
    Object.keys(ans)
      .filter((key) => ans[key])
      .map((filteredKey) => Number(filteredKey.slice(1)))
  );
};

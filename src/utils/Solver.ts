import { solve } from "sat-solver";
export default () => {
  const ans = solve("a | (b & c)").findOne();
  return ans;
};

export default (field: number[]): string => {
  const ruleArray = rule();
  const additionalRule: string[] = [];
  field.forEach((num, index) => {
    if (num === 0) return;
    additionalRule.push(`${index * 9 + num} 0`);
  });
  let ans = `p cnf 729 ${ruleArray.length + additionalRule.length} \n`;
  ans += [...ruleArray, ...additionalRule].join("\n");
  return ans;
};

// 数独のルールを示す論理式を作る
const rule = (): string[] => {
  const sections: string[] = [];
  // 各マスに1~9のいずれかが入るというルール
  for (let i = 0; i < 81; i++) {
    sections.push(
      [...Array(9).keys()].map((n) => n + i * 9 + 1).join(" ") + " 0"
    );
  }
  // 各行に同じ数字が現れないというルール
  for (let row = 0; row < 9; row++) {
    for (let num = 1; num <= 9; num++) {
      for (let col1 = 0; col1 < 9; col1++) {
        for (let col2 = col1 + 1; col2 < 9; col2++) {
          sections.push(
            `-${(row * 9 + col1) * 9 + num} -${(row * 9 + col2) * 9 + num} 0`
          );
        }
      }
    }
  }
  // 各列に同じ数字が現れないというルール
  for (let col = 0; col < 9; col++) {
    for (let num = 1; num <= 9; num++) {
      for (let row1 = 0; row1 < 9; row1++) {
        for (let row2 = row1 + 1; row2 < 9; row2++) {
          sections.push(
            `-${(row1 * 9 + col) * 9 + num} -${(row2 * 9 + col) * 9 + num} 0`
          );
        }
      }
    }
  }
  // 3✖︎3のマスに同じ数字が現れないというルール
  [0, 3, 6, 27, 30, 33, 54, 57, 60].forEach((i) => {
    const source = [0, 1, 2, 9, 10, 11, 18, 19, 20].map((e) => e + i * 9);
    for (let num = 1; num <= 9; num++) {
      for (let index1 = 0; index1 < 9; index1++) {
        for (let index2 = index1 + 1; index2 < 9; index2++) {
          sections.push(
            `-${source[index1] * 9 + num} -${source[index2] * 9 + num} 0`
          );
        }
      }
    }
  });
  console.log(sections.length);
  console.log(sections.join("\n"));
  return sections;
};

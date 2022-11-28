export default (field: number[]): string => {
  const ruleArray = rule();
  const additionalRule: string[] = [];
  field.forEach((num, index) => {
    if (num === 0) return;
    additionalRule.push(`${index * 4 + num} 0`);
  });
  let ans = `p cnf 729 ${ruleArray.length + additionalRule.length} \n`;
  ans += [...ruleArray, ...additionalRule].join("\n");
  return ans;
};

// 数独のルールを示す論理式を作る
const rule = (): string[] => {
  const sections: string[] = [];
  // 各マスに1~9のいずれかが入るというルール
  for (let i = 0; i < 16; i++) {
    sections.push(
      [...Array(4).keys()].map((n) => n + i * 4 + 1).join(" ") + " 0"
    );
  }
  // 各行に同じ数字が現れないというルール
  for (let row = 0; row < 4; row++) {
    for (let num = 1; num <= 4; num++) {
      for (let col1 = 0; col1 < 4; col1++) {
        for (let col2 = col1 + 1; col2 < 4; col2++) {
          sections.push(
            `-${(row * 4 + col1) * 4 + num} -${(row * 4 + col2) * 4 + num} 0`
          );
        }
      }
    }
  }
  // 各列に同じ数字が現れないというルール
  for (let col = 0; col < 4; col++) {
    for (let num = 1; num <= 4; num++) {
      for (let row1 = 0; row1 < 4; row1++) {
        for (let row2 = row1 + 1; row2 < 4; row2++) {
          sections.push(
            `-${(row1 * 4 + col) * 4 + num} -${(row2 * 4 + col) * 4 + num} 0`
          );
        }
      }
    }
  }
  // 2✖︎2のマスに同じ数字が現れないというルール
  [0, 2, 8, 10].forEach((i) => {
    const source = [0, 1, 4, 5].map((e) => e + i * 4);
    for (let num = 1; num <= 4; num++) {
      for (let index1 = 0; index1 < 4; index1++) {
        for (let index2 = index1 + 1; index2 < 4; index2++) {
          sections.push(
            `-${source[index1] * 4 + num} -${source[index2] * 4 + num} 0`
          );
        }
      }
    }
  });
  // console.log(sections.length);
  // console.log(sections.join("\n"));
  return sections;
};

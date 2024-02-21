function longestCommonSubSequence(str1, str2) {
  const n = str1.length;
  const m = str2.length;
  let dp = Array(n + 1)
    .fill()
    .map(() => Array(m + 1).fill(0));
  for (let i = 0; i < n + 1; i++) {
    dp[i][0] = 0;
  }
  for (let i = 0; i < m + 1; i++) {
    dp[0][i] = 0;
  }
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (str1[i - 1] === str2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp;
}

function generateAddDeleteMap(dp, str1, str2, type = "Character") {
  const result = [];
  let i = str1.length;
  let j = str2.length;
  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      if (
        type === "Character" &&
        result.length > 0 &&
        result[result.length - 1].type === "common"
      )
        result[result.length - 1].value =
          str1[i - 1] + result[result.length - 1].value;
      else result.push({ type: "common", value: str1[i - 1] });
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      if (
        type === "Character" &&
        result.length > 0 &&
        result[result.length - 1].type === "removed"
      )
        result[result.length - 1].value =
          str1[i - 1] + result[result.length - 1].value;
      else
        result.push({
          type: "removed",
          value: str1[i - 1],
        });
      i--;
    } else {
      if (
        type === "Character" &&
        result.length > 0 &&
        result[result.length - 1].type === "added"
      )
        result[result.length - 1].value =
          str2[j - 1] + result[result.length - 1].value;
      else result.push({ type: "added", value: str2[j - 1] });
      j--;
    }
  }
  while (i > 0) {
    if (
      type === "Character" &&
      result.length > 0 &&
      result[result.length - 1].type === "removed"
    )
      result[result.length - 1].value =
        str1[i - 1] + result[result.length - 1].value;
    else
      result.push({
        type: "removed",
        value: str1[i - 1],
      });
    i--;
  }

  while (j > 0) {
    if (
      type === "Character" &&
      result.length > 0 &&
      result[result.length - 1].type === "added"
    )
      result[result.length - 1].value =
        str2[j - 1] + result[result.length - 1].value;
    else result.push({ type: "added", value: str2[j - 1] });
    j--;
  }

  return result;
}

export function analyseDifferences(s1, s2, outputView) {
  return generateAddDeleteMap(
    longestCommonSubSequence(s1, s2),
    s1,
    s2,
    outputView
  ).reverse();
}

// console.log(
//   generateAddDeleteMap(
//     longestCommonSubSequence("Geeks", "Geeks"),
//     "Geeks",
//     "Geeks"
//   )
// );

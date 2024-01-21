export function getSummary(data: any, col: string) {
  let sum = 0;
  const keys = Object.keys(data);
  for (let item of keys) {
    sum += data[item][col];
  }
  return sum;
}

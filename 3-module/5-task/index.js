function getMinMax(str) {
  let arr = str
    .split(" ")
    .filter((item) => isFinite(item))
    .map((item) => +item)
    .sort((a, b) => a - b);
  return {
    min: Math.min(arr[0]),
    max: Math.max(arr[arr.length - 1]),
  };
}

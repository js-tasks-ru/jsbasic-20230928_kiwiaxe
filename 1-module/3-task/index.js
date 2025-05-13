function ucFirst(str) {
  let strArr = str.split("");
  if (!str) {
    return str;
  }
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}

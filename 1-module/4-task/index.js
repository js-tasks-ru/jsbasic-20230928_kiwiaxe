function checkSpam(str) {
  for (let i = 0; i < str.length; i++) {
    if (
      (str.toLowerCase()[i] === "1" &&
        str.toLowerCase()[i + 1] === "x" &&
        str.toLowerCase()[i + 2] === "b" &&
        str.toLowerCase()[i + 3] === "e" &&
        str.toLowerCase()[i + 4] === "t") ||
      (str.toLowerCase()[i] === "x" &&
        str.toLowerCase()[i + 1] === "x" &&
        str.toLowerCase()[i + 2] === "x")
    ) {
      return true;
    }
  }
  return false;
}

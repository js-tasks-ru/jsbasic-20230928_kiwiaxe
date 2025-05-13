function checkSpam(str) {
  for (let i = 0; i < str.length; i++) {
    if (
      str.toLowerCase().includes("1xbet") ||
      str.toLowerCase().includes("xxx")
    ) {
      return true;
    }
  }
  return false;
}

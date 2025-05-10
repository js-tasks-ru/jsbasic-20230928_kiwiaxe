function isEmpty(obj) {
  numberProp = 0;
  for (let key in obj) {
    numberProp++;
  }
  if (numberProp === 0) {
    return true;
  } else {
    return false;
  }
}

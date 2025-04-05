function camelize(str) {
  let arr = str.split('-'); // Массив из строки
  let result = arr.reduce((phrase, word) => {
  let arrWord = word.split('');
  arrWord[0] = arrWord[0].toUpperCase();
  return phrase + arrWord.join('')
});
  return result
}
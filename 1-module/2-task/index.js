/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
  let cond = true;
  if (name) {
    for (let i = 0; i < name.length; i++) {
      if (name[i] === " ") {
        cond = false;
      }
    }
  } else {
    return false;
  }
  if (name.length < 4 || !cond) {
    return false;
  } else {
    return true;
  }
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
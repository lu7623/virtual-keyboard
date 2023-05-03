// create interface

const body = document.querySelector('body');
const mainContainer = document.createElement('section');
body.append(mainContainer);
mainContainer.classList.add('main-container');
const title = document.createElement('h1');
title.classList.add('title');
title.innerText = 'RSS Виртуальная клавитура';
mainContainer.append(title);
const input = document.createElement('textarea');
input.id = 'text';
input.setAttribute('rows', 10);
input.setAttribute('cols', 100);
mainContainer.append(input);
const keyboard = document.createElement('div');
mainContainer.append(keyboard);
keyboard.classList.add('keyboard');
const rows = [];
let i = 0;
while (i < 5) {
  rows[i] = document.createElement('div');
  rows[i].classList.add('keyboard__row');
  keyboard.append(rows[i]);
  i += 1;
}
const descrition = document.createElement('p');
descrition.innerText = 'Клавиатура создана в операционной системе Windows. \n Для переключения языка комбинация: левыe ctrl + shift';
descrition.classList.add('keyboard__description');
mainContainer.append(descrition);
let language;

// create keys

function specialKeysClassAdd(keyName, el) {
  const key = el;
  if (keyName === 'space') {
    key.classList.add('key_special');
    key.innerText = '';
  }
  if (keyName === 'Tab') {
    key.classList.add('key_special');
  }
  if (keyName === 'alt-left') {
    key.classList.add('key_special');
    key.innerText = 'Alt';
  }
  if (keyName === 'alt-right') {
    key.classList.add('key_special');
    key.innerText = 'Alt';
  }
  if (keyName === 'ctrl-left') {
    key.classList.add('key_special');
    key.innerText = 'Ctrl';
  }
  if (keyName === 'ctrl-right') {
    key.classList.add('controlright');
    key.classList.add('key_special');
    key.innerText = 'Ctrl';
  }
  if (keyName === 'shift-left') {
    key.classList.add('shiftleft');
    key.classList.add('key_special');
    key.innerText = 'Shift';
  }
  if (keyName === 'shift-right') {
    key.classList.add('shiftright');
    key.classList.add('key_special');
    key.innerText = 'Shift';
  }
  if (keyName === 'CapsLock') {
    key.classList.add('key_special');
  }
  if (keyName === 'Win') {
    key.classList.add('key_special');
  }
  if (keyName === 'Backspace') {
    key.classList.add('key_special');
  }
  if (keyName === 'up') {
    key.classList.add('arrowup');
    key.classList.add('key_special');
    key.classList.add('key_arrow');
    key.innerText = '';
    const arrowsign = document.createElement('i');
    arrowsign.classList.add('fa-solid');
    arrowsign.classList.add('fa-arrow-up');
    key.append(arrowsign);
  }
  if (keyName === 'left') {
    key.classList.add('key_special');
    key.classList.add('key_arrow');
    key.innerText = '';
    const arrowsign = document.createElement('i');
    arrowsign.classList.add('fa-solid');
    arrowsign.classList.add('fa-arrow-left');
    key.append(arrowsign);
  }
  if (keyName === 'right') {
    key.classList.add('key_special');
    key.classList.add('key_arrow');
    key.innerText = '';
    const arrowsign = document.createElement('i');
    arrowsign.classList.add('fa-solid');
    arrowsign.classList.add('fa-arrow-right');
    key.append(arrowsign);
  }
  if (keyName === 'down') {
    key.classList.add('key_special');
    key.classList.add('key_arrow');
    key.innerText = '';
    const arrowsign = document.createElement('i');
    arrowsign.classList.add('fa-solid');
    arrowsign.classList.add('fa-arrow-down');
    key.append(arrowsign);
  }
  if (keyName === 'Enter') {
    key.classList.add('key_special');
  }
  if (keyName === 'delete') {
    key.innerText = 'Del';
    key.classList.add('key_special');
  }
  if (keyName === 'lang') {
    key.innerText = language;
    key.classList.add('key_special');
  }
}

async function getKeys(n) {
  const keys = 'keys.json';
  const res = await fetch(keys);
  const data = await res.json();
  let j = 0;
  rows.forEach((row) => {
    const currentRow = row;
    currentRow.replaceChildren();
    i = 0;
    while (i < data[n][j].length) {
      const key = document.createElement('div');
      const keyName = data[n][j][i].key;
      key.innerText = data[n][j][i].key;
      key.classList.add('key');
      key.classList.add(`${data[n][j][i].code}`);
      currentRow.append(key);
      specialKeysClassAdd(keyName, key);
      i += 1;
    }
    j += 1;
  });
}

async function getKeysEn() {
  getKeys(1);
}

async function getKeysRu() {
  getKeys(0);
}

// switch language

function languageSet() {
  if (language === 'ru') {
    getKeysRu();
  }
  if (language === 'en') {
    getKeysEn();
  }
}

function languageSwitch() {
  if (language === 'ru') {
    language = 'en';
    getKeysEn();
  } else if (language === 'en') {
    language = 'ru';
    getKeysRu();
  }
}

function setLocalStorage() {
  localStorage.setItem('userlanguage', language);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('userlanguage')) {
    language = localStorage.getItem('userlanguage');
  } else {
    language = 'en';
  }
}

window.addEventListener('load', () => {
  getLocalStorage();
  languageSet();
});

// input keyboard events

let string = '';
let caps = false;

input.addEventListener('keydown', (event) => {
  const keys = document.querySelectorAll('.key');
  if (event.code === 'ShiftLeft' && event.ctrlKey === true) {
    event.preventDefault();
    languageSwitch();
    input.value = string;
  }
  if (event.code === 'CapsLock') {
    event.preventDefault();
    caps = !caps;
    input.value = string;
  }
  if (event.code === 'Tab') {
    event.preventDefault();
    input.value = string;
  }
  keys.forEach((key) => {
    if (key.classList.contains(`${event.code}`)) {
      key.classList.add('active');
      if (!key.classList.contains('key_special')) {
        event.preventDefault();
        if (caps === true || event.shiftKey === true) {
          const letter = key.innerText;
          string += letter.toUpperCase();
          input.value = string;
        } else {
          string += key.innerText;
          input.value = string;
        }
        input.focus();
        input.selectionStart = input.value.length;
      } else if (key.classList.contains('Space')) {
        string += ' ';
        input.value = string;
        input.focus();
        input.selectionStart = input.value.length;
      } else if (key.classList.contains('Backspace')) {
        string = string.slice(0, -1);
        input.value = string;
        input.focus();
        input.selectionStart = input.value.length;
      }
      else if (key.classList.contains('Tab')) {
        string += '     ';
        input.value = string;
        input.focus();
        input.selectionStart = input.value.length;
      }
    }
  });
});

input.addEventListener('keyup', () => {
  const keys = document.querySelectorAll('.key');
  keys.forEach((key) => key.classList.remove('active'));
});

// input events by mouse

keyboard.addEventListener('mousedown', (event) => {
  input.value = input.innerText;
  if (event.target.classList.contains('key')) {
    event.target.classList.add('active');
    if (!event.target.classList.contains('key_special')) {
      if (caps === false) {
        string += event.target.innerText;
        input.value = string;
      } else {
        const letter = event.target.innerText;
        string += letter.toUpperCase();
        input.value = string;
      }
    } else if (event.target.classList.contains('Space')) {
      string += ' ';
      input.value = string;
    } else if (event.target.classList.contains('Backspace')) {
      string = string.slice(0, -1);
      input.value = string;
    } else if (event.target.classList.contains('CapsLock')) {
      caps = !caps;
      input.value = string;
    } else if (event.target.classList.contains('Enter')) {
      string += '\n';
      input.value = string;
    } else if (event.target.classList.contains('Lang')) {
      input.value = string;
      languageSwitch();
    } else if (event.target.classList.contains('Tab')) {
      string += '   ';
      input.value = string;
      languageSwitch();
    } else input.value = string;
  }
});

keyboard.addEventListener('mouseup', (event) => {
  event.target.classList.remove('active');
  input.focus();
  input.selectionStart = input.value.length;
});

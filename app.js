//create interface

const body = document.querySelector("body");
const mainContainer = document.createElement("section");
body.append(mainContainer);
mainContainer.classList.add("main-container");
const title = document.createElement("h1");
title.classList.add("title");
title.innerText = "RSS Виртуальная клавитура";
mainContainer.append(title);
const input = document.createElement("textarea");
input.id = "text";
input.setAttribute("rows", 10);
input.setAttribute("cols", 100);
mainContainer.append(input);
const keyboard = document.createElement("div");
mainContainer.append(keyboard);
keyboard.classList.add("keyboard");
const rows = [];
for (let i = 0; i < 5; i++) {
  rows[i] = document.createElement("div");
  rows[i].classList.add("keyboard__row");
  keyboard.append(rows[i]);
}
const descrition = document.createElement("p");
descrition.innerText =
  "Клавиатура создана в операционной системе Windows \n Для переключения языка комбинация: левыe ctrl + shift";
descrition.classList.add("keyboard__description");
mainContainer.append(descrition);

//create keys

function specialKeysClassAdd(keyName, key) {
  if (keyName == "space") {
    key.classList.add("key_special");
    key.innerText = "";
  }
  if (keyName == "Tab") {
    key.classList.add("key_special");
  }
  if (keyName == "alt-left") {
    key.classList.add("key_special");
    key.innerText = "Alt";
  }
  if (keyName == "alt-right") {
    key.classList.add("key_special");
    key.innerText = "Alt";
  }
  if (keyName == "ctrl-left") {
    key.classList.add("key_special");
    key.innerText = "Ctrl";
  }
  if (keyName == "ctrl-right") {
    key.classList.add("controlright");
    key.classList.add("key_special");
    key.innerText = "Ctrl";
  }
  if (keyName == "shift-left") {
    key.classList.add("shiftleft");
    key.classList.add("key_special");
    key.innerText = "Shift";
  }
  if (keyName == "shift-right") {
    key.classList.add("shiftright");
    key.classList.add("key_special");
    key.innerText = "Shift";
  }
  if (keyName == "CapsLock") {
    key.classList.add("key_special");
  }
  if (keyName == "Win") {
    key.classList.add("key_special");
  }
  if (keyName == "Backspace") {
    key.classList.add("key_special");
  }
  if (keyName == "up") {
    key.classList.add("arrowup");
    key.classList.add("key_special");
    key.classList.add("key_arrow");
    key.innerText = "";
    let arrowsign = document.createElement("i");
    arrowsign.classList.add("fa-solid");
    arrowsign.classList.add("fa-arrow-up");
    key.append(arrowsign);
  }
  if (keyName == "left") {
    key.classList.add("key_special");
    key.classList.add("key_arrow");
    key.innerText = "";
    let arrowsign = document.createElement("i");
    arrowsign.classList.add("fa-solid");
    arrowsign.classList.add("fa-arrow-left");
    key.append(arrowsign);
  }
  if (keyName == "right") {
    key.classList.add("key_special");
    key.classList.add("key_arrow");
    key.innerText = "";
    let arrowsign = document.createElement("i");
    arrowsign.classList.add("fa-solid");
    arrowsign.classList.add("fa-arrow-right");
    key.append(arrowsign);
  }
  if (keyName == "down") {
    key.classList.add("key_special");
    key.classList.add("key_arrow");
    key.innerText = "";
    let arrowsign = document.createElement("i");
    arrowsign.classList.add("fa-solid");
    arrowsign.classList.add("fa-arrow-down");
    key.append(arrowsign);
  }
  if (keyName == "Enter") {
    key.classList.add("key_special");
  }
  if (keyName == "delete") {
    key.innerText = "Del";
    key.classList.add("key_special");
  }
  if (keyName == "lang") {
    key.innerText = language;
    key.classList.add("key_special");
  }
}

async function getKeysEn() {
  const keys = "keys.json";
  const res = await fetch(keys);
  const data = await res.json();
  for (let j = 0; j < 5; j++) {
    let currentRow = rows[j];
    currentRow.replaceChildren();
    for (let i = 0; i < data[1][j].length; i++) {
      let key = document.createElement("div");
      let keyName = data[1][j][i].key;
      key.innerText = data[1][j][i].key;
      key.classList.add("key");
      key.classList.add(`${data[1][j][i].code}`);
      currentRow.append(key);
      specialKeysClassAdd(keyName, key);
    }
  }

}

async function getKeysRu() {
  const keys = "keys.json";
  const res = await fetch(keys);
  const data = await res.json();
  for (let j = 0; j < 5; j++) {
    let currentRow = rows[j];
    currentRow.replaceChildren();
    for (let i = 0; i < data[0][j].length; i++) {
      let key = document.createElement("div");
      let keyName = data[0][j][i].key;
      key.innerText = data[0][j][i].key;
      key.classList.add("key");
      key.classList.add(`${data[1][j][i].code}`);
      currentRow.append(key);
      specialKeysClassAdd(keyName, key);
    }
  }

}

//switch language

let language;

function languageSet() {
  
  if (language == "ru") {
    getKeysRu();
    
  }
  if (language == "en") {
    getKeysEn();
   
  }
}

function languageSwitch() {
  if (language == "ru") {
    language = "en";
    getKeysEn();
  } else if (language == "en") {
    language = "ru";
    getKeysRu();
  }
}

function setLocalStorage() {
  localStorage.setItem("userlanguage", language);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("userlanguage")) {
    language = localStorage.getItem("userlanguage");
  } else {
    language = "en";
  }
}

window.addEventListener("load", function () {
  getLocalStorage();
  languageSet();
});

//input keyboard events

let string = "";
input.addEventListener("keydown", function (event) {

  
  const keys = document.querySelectorAll(".key");
  const capslock = document.querySelector(".CapsLock");
  
  if (event.code == "ShiftLeft" && event.ctrlKey == true) {
    languageSwitch();
    event.preventDefault();
  }
  if (event.code == "CapsLock") {
    event.preventDefault();
    capslock.classList.toggle("caps");
  }
  if (event.code == "Tab") {
    event.preventDefault();

  }
  for (let i = 0; i < keys.length; i++) {

    console.log(language);
    if (keys[i].classList.contains(`${event.code}`)) {
      if (!keys[i].classList.contains("key_special")) {
        event.preventDefault();
        if (!capslock.classList.contains("caps")) {
            console.log( string);
          string = string + keys[i].innerText;
          input.value = string;
          
        } else {
          string = string + keys[i].innerText.toUpperCase();
          input.value = string;
        }
        input.focus();
        input.selectionStart = input.value.length;
      } else {
        if (keys[i].classList.contains("Space")) {
          string = string + " ";
          input.value = string;
          input.focus();
          input.selectionStart = input.value.length;
        }
        else if (keys[i].classList.contains("Backspace")) {
            string = string.slice(0,-1);
            input.value = string;
            input.focus();
            input.selectionStart = input.value.length;
          }
      }

      keys[i].classList.add("active");
    }
  }
});

input.addEventListener("keyup", function (event) {
  const keys = document.querySelectorAll(".key");
  
  for (let i = 0; i < keys.length; i++) {
    keys[i].classList.remove("active");
   
  }
});

//input events by mouse

keyboard.addEventListener("mousedown", function (event) {
    input.value = input.innerText;
    const capslock = document.querySelector(".CapsLock");
    if (event.target.classList.contains("key")){
    event.target.classList.add("active");
    if (!event.target.classList.contains("key_special")) {
        if (!capslock.classList.contains("caps")) {
    string = string + event.target.innerText;
          input.value = string;
    }
 else {
    let letter = event.target.innerText;
    console.log(letter);
    string = string + letter.toUpperCase();
          input.value = string;
}
} else {
    if (event.target.classList.contains("Space")) {
        string = string + ' ';
        input.value = string;
    }
    else if (event.target.classList.contains("Backspace")) {
        string = string.slice(0,-1);
        input.value = string;
    }
    else if (event.target.classList.contains("CapsLock")) {
        capslock.classList.toggle('caps');
    }
    else if (event.target.classList.contains("Enter")) {
        string = string + '\n';
        input.value = string;
    }
    else if (event.target.classList.contains("Lang")) {
        input.value = string;
        languageSwitch();
    }
}
}

  });
  
  keyboard.addEventListener("mouseup", function (event) {
    event.target.classList.remove("active");
    input.focus();
        input.selectionStart = input.value.length;
  });
  

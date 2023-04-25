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
input.setAttribute("cols", 125);
mainContainer.append(input);
const keyboard = document.createElement("div");
mainContainer.append(keyboard);
keyboard.classList.add("keyboard");
const rows = [];
for (let i=0; i<5; i++) {
 rows[i] = document.createElement("div");
rows[i].classList.add("keyboard__row");
keyboard.append(rows[i])
}
const descrition = document.createElement("p");
descrition.innerText = "Клавиатура создана в операционной системе Windows \n Для переключения языка комбинация: левыe ctrl + shift";
descrition.classList.add("keyboard__description");
mainContainer.append(descrition);

//create keys

function specialKeysClassAdd (keyName, key) {
    if (keyName == "space") {
        key.classList.add("space");
        key.classList.add("key_special");
        key.innerText = "";
       }
       if (keyName == "tab") {
        key.classList.add("tab");
        key.classList.add("key_special");
       }
       if (keyName == "alt-left") {
        key.classList.add("alt-left");
        key.classList.add("key_special");
        key.innerText = "alt";
       }
       if (keyName == "alt-right") {
        key.classList.add("alt-right");
        key.classList.add("key_special");
        key.innerText = "alt";
       }
       if (keyName == "ctrl-left") {
        key.classList.add("ctrl-left");
        key.classList.add("key_special");
        key.innerText = "ctrl";
       }
       if (keyName == "ctrl-right") {
        key.classList.add("ctrl-right");
        key.classList.add("key_special");
        key.innerText = "ctrl";
       }
       if (keyName == "shift-left") {
        key.classList.add("shift-left");
        key.classList.add("key_special");
        key.innerText = "shift";
       }
       if (keyName == "shift-right") {
        key.classList.add("shift-right");
        key.classList.add("key_special");
        key.innerText = "shift";
       }
       if (keyName == "capslock") {
        key.classList.add("capslock");
        key.classList.add("key_special");
       }
       if (keyName == "win") {
        key.classList.add("win");
        key.classList.add("key_special");
       }
       if (keyName == "backspace") {
        key.classList.add("backspace");
        key.classList.add("key_special");
       }
       if (keyName == "up") {
        key.classList.add("up");
        key.classList.add("key_arrow");
        key.innerText = "";
       }
       if (keyName == "left") {
        key.classList.add("left");
        key.classList.add("key_arrow");
        key.innerText = "";
       }
       if (keyName == "right") {
        key.classList.add("right");
        key.classList.add("key_arrow");
        key.innerText = "";
       }
       if (keyName == "down") {
        key.classList.add("down");
        key.classList.add("key_arrow");
        key.innerText = "";
       }
       if (keyName == "enter") {
        key.classList.add("enter");
        key.classList.add("key_special");
       }
       if (keyName == "del") {
        key.classList.add("del");
        key.classList.add("key_special");
       }
}


async function getKeysEn() {
    const keys = "keys.json";
    const res = await fetch(keys);
    const data = await res.json();
    for (let j=0; j<6; j++) {
        let currentRow = rows[j];
    for (let i=0; i<data[1][j].length; i++) {
       let key = document.createElement("div");
       let keyName = data[1][j][i];
       key.innerText = data[1][j][i];
       key.classList.add("key");
       currentRow.append(key);
       specialKeysClassAdd (keyName, key);
    }
}
  }

  async function getKeysRu() {
    const keys = "keys.json";
    const res = await fetch(keys);
    const data = await res.json();
    for (let j=0; j<6; j++) {
        let currentRow = rows[j];
    for (let i=0; i<data[0][j].length; i++) {
       let key = document.createElement("div");
       key.innerText = data[0][j][i];
       key.classList.add("key");
       currentRow.append(key);
       let keyName = data[1][j][i];
       specialKeysClassAdd (keyName, key);
    }
}
  }


  //switch language

let language = "en";

 function languageSwitch () {
if (language == "ru") { getKeysRu();}
else getKeysEn();
 }

languageSwitch ();
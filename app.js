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
       if (keyName == "Tab") {
        key.classList.add("tab");
        key.classList.add("key_special");
       }
       if (keyName == "alt-left") {
        key.classList.add("altleft");
        key.classList.add("key_special");
        key.innerText = "Alt";
       }
       if (keyName == "alt-right") {
        key.classList.add("altright");
        key.classList.add("key_special");
        key.innerText = "Alt";
       }
       if (keyName == "ctrl-left") {
        key.classList.add("controlleft");
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
        key.classList.add("capslock");
        key.classList.add("key_special");
       }
       if (keyName == "Win") {
        key.classList.add("metaleft");
        key.classList.add("key_special");
       }
       if (keyName == "Backspace") {
        key.classList.add("backspace");
        key.classList.add("key_special");
       }
       if (keyName == "up") {
        key.classList.add("arrowup");
        key.classList.add("key_special");
        key.classList.add("key_arrow");
        key.innerText = "";
        let arrowsign = document.createElement('i');
        arrowsign.classList.add('fa-solid');
        arrowsign.classList.add('fa-arrow-up');
        key.append(arrowsign);
       }
       if (keyName == "left") {
        key.classList.add("arrowleft");
        key.classList.add("key_special");
        key.classList.add("key_arrow");
        key.innerText = "";
        let arrowsign = document.createElement('i');
        arrowsign.classList.add('fa-solid');
        arrowsign.classList.add('fa-arrow-left');
        key.append(arrowsign);
       }
       if (keyName == "right") {
        key.classList.add("arrowright");
        key.classList.add("key_special");
        key.classList.add("key_arrow");
        key.innerText = "";
        let arrowsign = document.createElement('i');
        arrowsign.classList.add('fa-solid');
        arrowsign.classList.add('fa-arrow-right');
        key.append(arrowsign);
       }
       if (keyName == "down") {
        key.classList.add("arrowdown");
        key.classList.add("key_special");
        key.classList.add("key_arrow");
        key.innerText = "";
        let arrowsign = document.createElement('i');
        arrowsign.classList.add('fa-solid');
        arrowsign.classList.add('fa-arrow-down');
        key.append(arrowsign);
       }
       if (keyName == "Enter") {
        key.classList.add("enter");
        key.classList.add("key_special");
       }
       if (keyName == "delete") {
        key.classList.add("delete");
        key.innerText = "Del";
        key.classList.add("key_special");
       }
}


async function getKeysEn() {
    const keys = "keys.json";
    const res = await fetch(keys);
    const data = await res.json();
    for (let j=0; j<5; j++) {
        let currentRow = rows[j];
        currentRow.replaceChildren();
    for (let i=0; i<data[1][j].length; i++) {
       let key = document.createElement("div");
       let keyName = data[1][j][i].key;
       key.innerText = data[1][j][i].key;
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
    for (let j=0; j<5; j++) {
        let currentRow = rows[j];
     currentRow.replaceChildren();
    for (let i=0; i<data[0][j].length; i++) {
        let key = document.createElement("div");
        let keyName = data[0][j][i].key;
        key.innerText = data[0][j][i].key;
        key.classList.add("key");
        currentRow.append(key);
        specialKeysClassAdd (keyName, key);
    }
}
  }

  //switch language

let language;

 function languageSet () {
if (language == "ru") { getKeysRu();}
if (language == "en") { getKeysEn();}
 }

 function languageSwitch () {
    if (language == "ru") { 
        language = "en";
        
        getKeysEn();}
   else if (language == "en") { 
        language = 'ru';
        getKeysRu();}
        console.log(language);
     }
    
    

function setLocalStorage() {    
    localStorage.setItem("userlanguage", language);
  }
  window.addEventListener("beforeunload", setLocalStorage);
  
  function getLocalStorage() {
    if (localStorage.getItem("userlanguage")) {
      language = localStorage.getItem("userlanguage");
    }
   else {language = "en";}
    }
    
  window.addEventListener('load', function(){
    getLocalStorage();
    languageSet ();
  });


//input events


input.addEventListener('keydown', function(event) {
    const keys = document.querySelectorAll(".key");
    const secialKeys = document.querySelectorAll(".key_special");
	console.log(event);
    if (event.code == 'Tab') {
        event.preventDefault();
    }
    if (event.code == 'ShiftLeft' && event.ctrlKey == true) {
        languageSwitch();
    }
for (let i=0; i<keys.length; i++) {
    if (event.key.toLowerCase() == keys[i].innerText && !keys[i].classList.contains("key_special")){
        keys[i].classList.add("active");
    }
}
for (let i=0; i<secialKeys.length; i++) {
    if (secialKeys[i].classList.contains(event.code.toLowerCase())) {
        secialKeys[i].classList.add("active");
    }
}
});

input.addEventListener('keyup', function(event) {
    const keys = document.querySelectorAll(".key");
	console.log(event.code);
for (let i=0; i<keys.length; i++) {
        keys[i].classList.remove("active");
    }

});
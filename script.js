const rates = {

USD:{INR:83.2,EUR:0.92,GBP:0.79,JPY:146.5,USD:1},
INR:{USD:0.012,EUR:0.011,GBP:0.0095,JPY:1.76,INR:1},
EUR:{USD:1.09,INR:90.5,GBP:0.86,JPY:159.2,EUR:1},
GBP:{USD:1.27,INR:105.2,EUR:1.16,JPY:185.4,GBP:1},
JPY:{USD:0.0068,INR:0.57,EUR:0.0063,GBP:0.0054,JPY:1}

};

setInterval(() => {

document.getElementById("dateTime").innerHTML =
new Date().toLocaleString();

},1000);

function convertCurrency(){

let amount =
parseFloat(document.getElementById("amount").value);

let from =
document.getElementById("fromCurrency").value;

let to =
document.getElementById("toCurrency").value;

if(!amount){

alert("Enter amount");
return;

}

let rate = rates[from][to];

let converted =
(amount * rate).toFixed(2);

document.getElementById("result").innerHTML =
`${amount} ${from} = ${converted} ${to}`;

document.getElementById("exchangeRate").innerHTML =
`1 ${from} = ${rate} ${to}`;

saveHistory(
`${amount} ${from} ➜ ${converted} ${to}`
);

}

document.getElementById("swapBtn")
.addEventListener("click",()=>{

let from =
document.getElementById("fromCurrency");

let to =
document.getElementById("toCurrency");

let temp = from.value;

from.value = to.value;

to.value = temp;

});

function saveHistory(record){

let history =
JSON.parse(
localStorage.getItem("history")
) || [];

history.unshift(
new Date().toLocaleTimeString() +
" - " + record
);

localStorage.setItem(
"history",
JSON.stringify(history)
);

displayHistory();

}

function displayHistory(){

let history =
JSON.parse(
localStorage.getItem("history")
) || [];

let list =
document.getElementById("historyList");

list.innerHTML="";

history.forEach(item=>{

let li =
document.createElement("li");

li.innerText=item;

list.appendChild(li);

});

}

function clearHistory(){

localStorage.removeItem("history");

displayHistory();

}

function copyResult(){

let result =
document.getElementById("result")
.innerText;

navigator.clipboard.writeText(result);

alert("Copied");

}

function saveFavorite(){

let from =
document.getElementById("fromCurrency").value;

let to =
document.getElementById("toCurrency").value;

localStorage.setItem(
"favorite",
`${from} ➜ ${to}`
);

loadFavorite();

}

function loadFavorite(){

let fav =
localStorage.getItem("favorite");

if(fav){

document.getElementById(
"favoritePair"
).innerText=fav;

}

}

function downloadHistory(){

let history =
localStorage.getItem("history");

let blob =
new Blob([history],{
type:"text/plain"
});

let a =
document.createElement("a");

a.href =
URL.createObjectURL(blob);

a.download =
"history.txt";

a.click();

}

const themeBtn =
document.getElementById("themeBtn");

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

localStorage.setItem(
"theme",
document.body.classList.contains("dark")
);

});

window.onload=()=>{

displayHistory();

loadFavorite();

if(localStorage.getItem("theme")
==="true"){

document.body.classList.add("dark");

}

};
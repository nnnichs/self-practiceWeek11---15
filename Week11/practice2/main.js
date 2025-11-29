import { longest } from "./quoteUtil.js";

/* Week10*/

const bg = document.getElementById("bgColor");
const font = document.getElementById("fontColor");

function loadTheme() {
  bg.value = localStorage.getItem("bgColor") || "#ffffff";
  font.value = localStorage.getItem("fontColor") || "#000000";
  applyTheme();
}

function applyTheme() {
  document.body.style.backgroundColor = bg.value;
  document.body.style.color = font.value;
}

document.getElementById("saveTheme").addEventListener("click", () => {
  localStorage.setItem("bgColor", bg.value);
  localStorage.setItem("fontColor", font.value);
  applyTheme();
});

document.getElementById("resetTheme").addEventListener("click", () => {
  localStorage.clear();
  loadTheme();
});

loadTheme();

/* QUOTE MANAGER*/

const quotes = [];
let id = 1;

const qInput = document.getElementById("quoteInput");
const aInput = document.getElementById("authorInput");
const qList = document.getElementById("quoteList");

document.getElementById("addQuote").addEventListener("click", () => {
  const content = qInput.value.trim();
  const author = aInput.value.trim();
  if (!content || !author) return;

  const quote = { id: id++, content, author };

  quotes.push(quote);
  addToDOM(quote);

  qInput.value = "";
  aInput.value = "";
});

function addToDOM(quote) {
  const li = document.createElement("li");
  li.dataset.id = quote.id;
  li.textContent = `"${quote.content}" — ${quote.author}`;

  const del = document.createElement("button");
  del.textContent = "X";
  del.dataset.type = "delete";

  li.appendChild(del);
  qList.appendChild(li);
}

qList.addEventListener("click", (e) => {
  if (e.target.dataset.type === "delete") {
    const li = e.target.parentElement;
    const id = Number(li.dataset.id);

    const index = quotes.findIndex((q) => q.id === id);
    if (index !== -1) quotes.splice(index, 1);

    li.remove();
  }
});

/* Random quote */
document.getElementById("randomQuote").addEventListener("click", () => {
  if (quotes.length === 0) {
    randomDisplay.textContent = "No quotes yet";
    return;
  }
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("randomDisplay").textContent =
    `"${q.content}" — ${q.author}`;
});

/* Week09)*/

let count = 0;
const keyBox = document.getElementById("keyBox");
const keyCount = document.getElementById("keyCount");

keyBox.addEventListener("keydown", () => {
  count++;
  keyCount.textContent = count;
});

/*Week06 */

document.getElementById("longestQuoteBtn").addEventListener("click", () => {
  if (quotes.length === 0) {
    document.getElementById("longestQuote").textContent = "No quotes yet";
    return;
  }
  const max = longest(quotes);
  document.getElementById("longestQuote").textContent =
    `Longest: "${max.content}" — ${max.author}`;
});

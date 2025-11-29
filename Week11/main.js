import { calculate, sum } from "./utils.js";

/*(Week10) */

const bg = document.getElementById("bgColor");
const font = document.getElementById("fontColor");
const size = document.getElementById("fontSize");

function loadTheme() {
  bg.value = localStorage.getItem("bgColor") || "#ffffff";
  font.value = localStorage.getItem("fontColor") || "#000000";
  size.value = localStorage.getItem("fontSize") || "medium";
  applyTheme();
}

function applyTheme() {
  document.body.style.backgroundColor = bg.value;
  document.body.style.color = font.value;

  if (size.value === "small") document.body.style.fontSize = "14px";
  else if (size.value === "large") document.body.style.fontSize = "22px";
  else document.body.style.fontSize = "18px";
}

document.getElementById("saveTheme").addEventListener("click", () => {
  localStorage.setItem("bgColor", bg.value);
  localStorage.setItem("fontColor", font.value);
  localStorage.setItem("fontSize", size.value);
  applyTheme();
});

document.getElementById("resetTheme").addEventListener("click", () => {
  localStorage.clear();
  loadTheme();
});

loadTheme();

/*(Week07-09 DOM+Event) */

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const error = document.getElementById("error");

// blur → ตรวจค่าว่าง (Week09)
todoInput.addEventListener("blur", () => {
  if (todoInput.value.trim() === "") {
    error.textContent = "Input is empty";
    error.style.color = "red";
  } else {
    error.textContent = "";
  }
});

// add
addBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.textContent = text;

  // ปุ่มลบ (DOM manipulation)
  const del = document.createElement("button");
  del.textContent = "X";
  del.dataset.type = "delete"; // ใช้ dataset (Week08)

  li.appendChild(del);
  todoList.appendChild(li);
  
  todoInput.value = "";
});

// event delegation (จับลบรายการ)
todoList.addEventListener("click", (e) => {
  if (e.target.dataset.type === "delete") {
    e.target.parentElement.remove();
  }
});

/* Week06 Callback Example  */

document.getElementById("sumBtn").addEventListener("click", () => {
  const result = calculate([1, 2, 3, 4, 5], sum);
  document.getElementById("sumResult").textContent = "Result = " + result;
});

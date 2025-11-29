import { getItems, addItem, updateItem, deleteItem } from "./myLib/fetchUtils.js"
import { showDialog } from "./myLib/dialog.js"
import { formatDate } from "./myLib/formatter.js"

const API = `${import.meta.env.VITE_APP_URL}/tasks`

document.addEventListener("DOMContentLoaded", init)

async function init() {
  const tasks = await getItems(API)
  tasks.forEach(renderTask)

  document.getElementById("saveBtn").onclick = handleSave
}

function renderTask(task) {
  const div = document.createElement("div")
  div.dataset.id = task.id

  div.innerHTML = `
    <p>${task.text}</p>
    <p class="task-date">Created: ${formatDate(task.createdAt)}</p>
    <button class="editBtn">Edit</button>
    <button class="deleteBtn">Delete</button>
  `

  div.querySelector(".editBtn").onclick = () => handleEdit(task)
  div.querySelector(".deleteBtn").onclick = () => handleDelete(task)

  document.getElementById("taskList").appendChild(div)
}

async function handleSave() {
  const id = document.getElementById("taskId").value
  const text = document.getElementById("taskText").value

  if (id) {
    // UPDATE
    const updated = await updateItem(API, { id, text, createdAt: Date.now() })
    document.querySelector(`div[data-id="${id}"]`).remove()
    renderTask(updated)
  } else {
    // ADD
    const created = await addItem(API, { text, createdAt: Date.now() })
    renderTask(created)
  }

  document.getElementById("taskForm").reset()
  document.getElementById("taskId").value = ""
}

async function handleEdit(task) {
  document.getElementById("taskId").value = task.id
  document.getElementById("taskText").value = task.text
}

async function handleDelete(task) {
  const result = await showDialog()
  if (result === "OK") {
    await deleteItem(API, task.id)
    document.querySelector(`div[data-id="${task.id}"]`).remove()
  }
}

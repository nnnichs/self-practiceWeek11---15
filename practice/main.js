import { loadTasks, addTask, editTask, deleteTask } from "./api/taskAPI.js"
import { showDialog } from "./components/dialog.js"
import { analyzeAll } from "./utils/analytics.js"
import { isValidDeadline } from "./utils/dateUtils.js"

const list = document.getElementById("taskList")
const form = document.getElementById("taskForm")
const analyticsBox = document.getElementById("analytics")

document.addEventListener("DOMContentLoaded", init)

async function init() {
  const tasks = await loadTasks()
  renderList(tasks)
  renderAnalytics(tasks)
}

// RENDER LIST 

function renderList(tasks) {
  list.innerHTML = ""
  tasks.forEach((t) => list.appendChild(createCard(t)))
}

//RENDER ANALYTICS 

function renderAnalytics(tasks) {
  const result = analyzeAll(tasks)

  analyticsBox.innerHTML = `
    <p>Total Tasks: ${result.total}</p>
    <p>Pending: ${result.pending}</p>
    <p>Done: ${result.done}</p>
    <p>Longest Title: ${result.longestTitle}</p>
    <p>Average Title Length: ${result.avg}</p>
  `
}

//CARD 

function createCard(task) {
  const div = document.createElement("div")
  div.className = "task-card"
  div.dataset.id = task.id

  div.style.borderLeft = "5px solid " + getDeadlineColor(task.deadline)

  const title = document.createElement("p")
  title.textContent = task.title

  const deadline = document.createElement("p")
  deadline.textContent = new Date(task.deadline).toLocaleString()

  const btnEdit = document.createElement("button")
  btnEdit.textContent = "Edit"
  btnEdit.onclick = () => fillForm(task)

  const btnDelete = document.createElement("button")
  btnDelete.textContent = "Delete"
  btnDelete.onclick = () => handleDelete(task.id)

  div.append(title, deadline, btnEdit, btnDelete)
  return div
}

// FORM HANDLING 

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const id = form.taskId.value
  const title = form.title.value
  const deadline = form.deadline.value

  if (!isValidDeadline(deadline)) {
    await showDialog("Invalid deadline: must be in the future")
    return
  }

  if (id) {
    await editTask({ id, title, deadline })
  } else {
    await addTask({ title, deadline, status: "pending" })
  }

  const tasks = await loadTasks()
  renderList(tasks)
  renderAnalytics(tasks)

  form.reset()
})

function fillForm(task) {
  form.taskId.value = task.id
  form.title.value = task.title
  form.deadline.value = task.deadline.slice(0, 16)
}

//  DELETE 

async function handleDelete(id) {
  const result = await showDialog("Delete this task?")
  if (result === "OK") {
    await deleteTask(id)
    const tasks = await loadTasks()
    renderList(tasks)
    renderAnalytics(tasks)
  }
}

//  DEADLINE COLOR -

function getDeadlineColor(deadline) {
  const d = new Date(deadline)
  const now = new Date()
  const diff = d - now

  if (diff < 0) return "red"
  if (diff < 86400000) return "orange"
  return "green"
}

const API = "http://localhost:5000/tasks"

export async function loadTasks() {
  const res = await fetch(API)
  return await res.json()
}

export async function addTask(task) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
  return await res.json()
}

export async function editTask(task) {
  const res = await fetch(`${API}/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
  return await res.json()
}

export async function deleteTask(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  })
  return id
}

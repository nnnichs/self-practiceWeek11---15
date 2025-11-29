export async function getItems(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Fail to load items")
  return res.json()
}

export async function addItem(url, item) {
  const res = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(item)
  })
  return res.json()
}

export async function updateItem(url, item) {
  const res = await fetch(`${url}/${item.id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(item)
  })
  return res.json()
}

export async function deleteItem(url, id) {
  await fetch(`${url}/${id}`, { method: "DELETE" })
  return id
}

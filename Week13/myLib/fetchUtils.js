
// CRUD UTIL FUNCTIONS

// GET
async function getItems(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error("Fail to get items")
    return await res.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

// POST
async function addItem(url, item) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
    if (res.status !== 201) throw new Error("Fail to add item")
    return await res.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

// PUT
async function editItem(url, item) {
  try {
    const res = await fetch(`${url}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
    if (!res.ok) throw new Error("Fail to edit item")
    return await res.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

// DELETE
async function deleteItem(url, id) {
  try {
    const res = await fetch(`${url}/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Fail to delete item")
    return id
  } catch (error) {
    throw new Error(error.message)
  }
}

export { getItems, addItem, editItem, deleteItem }

import { loadQuotes, addQuote, editQuote, deleteQuote } from "./quoteManagement.js"

document.addEventListener("DOMContentLoaded", async () => {
  const quotes = await loadQuotes()
  const list = document.getElementById("quoteList")

  quotes.forEach((q) => list.appendChild(newQuoteCard(q)))
})

function newQuoteCard(quote) {
  const div = document.createElement("div")
  div.className = "quote-card"
  div.dataset.id = quote.id

  const p1 = document.createElement("p")
  p1.textContent = quote.content
  const p2 = document.createElement("p")
  p2.className = "author"
  p2.textContent = quote.author

  const actions = document.createElement("div")
  actions.className = "actions"

  const btnEdit = document.createElement("button")
  btnEdit.textContent = "Edit"
  btnEdit.dataset.id = quote.id
  btnEdit.onclick = handleEdit

  const btnDelete = document.createElement("button")
  btnDelete.textContent = "Delete"
  btnDelete.dataset.id = quote.id
  btnDelete.onclick = handleDelete

  actions.append(btnEdit, btnDelete)
  div.append(p1, p2, actions)
  return div
}

// ------------------ EDIT -------------------
function handleEdit(e) {
  const id = e.target.dataset.id
  const card = document.querySelector(`div[data-id="${id}"]`)

  const form = document.getElementById("quoteForm")
  form.quoteId.value = id
  form.content.value = card.children[0].textContent
  form.author.value = card.children[1].textContent
}

// ------------------ DELETE -------------------
async function handleDelete(e) {
  const id = e.target.dataset.id
  if (!confirm(`Delete quote: ${id}?`)) return

  try {
    await deleteQuote(id)
    document.querySelector(`div[data-id="${id}"]`).remove()
  } catch (err) {
    alert(`App: ${err.message}`)
  }
}

// ------------------ ADD & EDIT -------------------
const form = document.getElementById("quoteForm")
form.addEventListener("submit", handleSubmit)

async function handleSubmit(e) {
  e.preventDefault()

  const id = form.quoteId.value
  const content = form.content.value
  const author = form.author.value

  if (id) {
    // EDIT
    const updated = await editQuote({ id, content, author })
    const card = document.querySelector(`div[data-id="${id}"]`)
    card.children[0].textContent = updated.content
    card.children[1].textContent = updated.author
  } else {
    // ADD
    const newQ = await addQuote({ content, author })
    document.getElementById("quoteList").appendChild(newQuoteCard(newQ))
  }

  form.reset()
}

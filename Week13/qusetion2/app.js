// chat ช่วยไกด์ตลอด
import {
  loadQuotes,
  addQuote,
  editQuote,
  deleteQuote,
} from "./quoteManagement.js"

// Load all quotes & favorites
document.addEventListener("DOMContentLoaded", async () => {
  const quotes = await loadQuotes()
  const list = document.getElementById("quoteList")

  quotes.forEach((q) => list.appendChild(newQuoteCard(q)))

  loadFavorites()
})

//CREATE CARD
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

  // Edit
  const editBtn = document.createElement("button")
  editBtn.textContent = "Edit"
  editBtn.dataset.id = quote.id
  editBtn.onclick = handleEdit

  // Delete
  const deleteBtn = document.createElement("button")
  deleteBtn.textContent = "Delete"
  deleteBtn.dataset.id = quote.id
  deleteBtn.onclick = handleDelete

  // Favorite ❤️
  const favBtn = document.createElement("button")
  favBtn.innerHTML = "❤️"
  favBtn.className = "fav-btn"
  favBtn.dataset.id = quote.id
  favBtn.onclick = handleFavorite

  actions.append(editBtn, deleteBtn, favBtn)
  div.append(p1, p2, actions)
  return div
}

// EDIT 
function handleEdit(e) {
  const id = e.target.dataset.id
  const card = document.querySelector(`div[data-id="${id}"]`)
  const form = document.getElementById("quoteForm")

  form.quoteId.value = id
  form.content.value = card.children[0].textContent
  form.author.value = card.children[1].textContent
}

//  DELETE 
async function handleDelete(e) {
  const id = e.target.dataset.id
  if (!confirm("Delete?")) return

  await deleteQuote(id)
  document.querySelector(`div[data-id="${id}"]`).remove()
}

//ADD / EDIT
const form = document.getElementById("quoteForm")
form.addEventListener("submit", handleSubmit)

async function handleSubmit(e) {
  e.preventDefault()

  const id = form.quoteId.value
  const content = form.content.value
  const author = form.author.value

  if (id) {
    // EDIT
    const q = await editQuote({ id, content, author })
    const card = document.querySelector(`div[data-id="${id}"]`)
    card.children[0].textContent = q.content
    card.children[1].textContent = q.author
  } else {
    // ADD
    const q = await addQuote({ content, author })
    document.getElementById("quoteList").appendChild(newQuoteCard(q))
  }

  form.reset()
}

//FAVORITE FEATURE 
function getFavs() {
  return JSON.parse(localStorage.getItem("favorites") || "[]")
}

function saveFavs(favs) {
  localStorage.setItem("favorites", JSON.stringify(favs))
}

function handleFavorite(e) {
  const id = Number(e.target.dataset.id)
  const allQuotes = document.querySelectorAll("#quoteList .quote-card")

  const card = [...allQuotes].find((c) => Number(c.dataset.id) === id)

  const quote = {
    id,
    content: card.children[0].textContent,
    author: card.children[1].textContent,
  }

  const favs = getFavs()
  favs.push(quote)
  saveFavs(favs)

  loadFavorites()
}

function loadFavorites() {
  const favs = getFavs()
  const favList = document.getElementById("favList")

  favList.innerHTML = ""

  favs.forEach((q) => {
    const card = document.createElement("div")
    card.className = "quote-card"
    card.innerHTML = `<p>${q.content}</p><p class="author">${q.author}</p>`
    favList.appendChild(card)
  })
}

import { getQuotes, addQuote, deleteQuote, updateQuote } from "./quoteAPI.js";

const quoteList = document.getElementById("quoteList");
const addBtn = document.getElementById("addBtn");

async function renderQuotes() {
  const quotes = await getQuotes();
  quoteList.innerHTML = "";

  quotes.forEach((q) => {
    const div = document.createElement("div");
    div.className = "quote-card";
    div.innerHTML = `
      <p>"${q.content}"</p>
      <p>— ${q.author}</p>
      <button class="edit" data-id="${q.id}">Edit</button>
      <button class="delete" data-id="${q.id}">Delete</button>
    `;
    quoteList.appendChild(div);
  });
}

addBtn.addEventListener("click", async () => {
  const content = document.getElementById("quoteText").value;
  const author = document.getElementById("quoteAuthor").value;
  if (!content || !author) return alert("Please fill both fields!");
  await addQuote(content, author);
  renderQuotes();
});

quoteList.addEventListener("click", async (e) => {
  const id = e.target.dataset.id;

  if (e.target.classList.contains("delete")) {
    await deleteQuote(id);
  }

  if (e.target.classList.contains("edit")) {
    const newContent = prompt("Edit quote content:");
    const newAuthor = prompt("Edit author name:");
    if (newContent && newAuthor) {
      await updateQuote(id, newContent, newAuthor);
    }
  }

  renderQuotes();
});

renderQuotes();

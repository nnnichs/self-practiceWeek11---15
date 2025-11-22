import { loadQuotes } from "./quoteManagement.js";

document.addEventListener("DOMContentLoaded", async () => {
  const quoteList = document.querySelector("#quoteList");
  const quotes = await loadQuotes();

  quotes.forEach((quote) => {
    const div = document.createElement("div");
    div.className = "quote-card";
    div.dataset.id = quote.id;

    const content = document.createElement("p");
    content.textContent = `"${quote.content}"`;

    const author = document.createElement("p");
    author.textContent = `— ${quote.author}`;

    div.appendChild(content);
    div.appendChild(author);
    quoteList.appendChild(div);
  });
});

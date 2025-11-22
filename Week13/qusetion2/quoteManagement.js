import { getItems, addItem, editItem, deleteItem } from "./myLib/fetchUtils.js"

const quoteURL = `${import.meta.env.VITE_APP_URL}/quotes`

async function loadQuotes() {
  try {
    return await getItems(quoteURL)
  } catch (error) {
    alert(error.message)
  }
}

async function addQuote(item) {
  try {
    return await addItem(quoteURL, item)
  } catch (error) {
    alert(error.message)
  }
}

async function editQuote(item) {
  try {
    return await editItem(quoteURL, item)
  } catch (error) {
    alert(error.message)
  }
}

async function deleteQuote(id) {
  try {
    return await deleteItem(quoteURL, id)
  } catch (error) {
    alert(error.message)
  }
}

export { loadQuotes, addQuote, editQuote, deleteQuote }

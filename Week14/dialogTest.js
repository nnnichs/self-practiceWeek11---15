import { showDialog } from "./myLib/dialog.js"

document.getElementById("btn-dialog").addEventListener("click", async () => {
  const result = await showDialog()
  console.log("User clicked:", result)

  if (result.toLowerCase().includes("ok")) console.log("goto ok action")
  else console.log("goto cancel action")

  console.log("good bye")
})

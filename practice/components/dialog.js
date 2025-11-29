export function showDialog(message = "Are you sure?") {
  return new Promise((resolve) => {
    const dialog = document.getElementById("confirmDialog")
    const msg = document.getElementById("dialogMessage")
    const okBtn = document.getElementById("okBtn")
    const cancelBtn = document.getElementById("cancelBtn")

    msg.textContent = message

    function cleanup(result) {
      okBtn.removeEventListener("click", ok)
      cancelBtn.removeEventListener("click", cancel)
      dialog.close()
      resolve(result)
    }

    function ok() { cleanup("OK") }
    function cancel() { cleanup("CANCEL") }

    okBtn.addEventListener("click", ok)
    cancelBtn.addEventListener("click", cancel)

    dialog.showModal()
  })
}

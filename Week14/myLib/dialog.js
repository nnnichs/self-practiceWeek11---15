export function showDialog() {
  return new Promise((resolve) => {
    const dialogMessage = document.getElementById("messageDialog")
    const btnOK = document.getElementById("okBtn")
    const btnCancel = document.getElementById("cancelBtn")

    const handlerOK = () => {
      cleanup()
      resolve("OK")
    }

    const handlerCancel = () => {
      cleanup()
      resolve("Cancel")
    }

    function cleanup() {
      btnOK.removeEventListener("click", handlerOK)
      btnCancel.removeEventListener("click", handlerCancel)
      dialogMessage.close()
    }

    btnOK.addEventListener("click", handlerOK)
    btnCancel.addEventListener("click", handlerCancel)

    dialogMessage.showModal()
  })
}

export function showDialog() {
  return new Promise(resolve => {
    const dialog = document.getElementById("confirmDialog")
    const ok = document.getElementById("okBtn")
    const cancel = document.getElementById("cancelBtn")

    const handleOk = () => { cleanup(); resolve("OK") }
    const handleCancel = () => { cleanup(); resolve("Cancel") }

    function cleanup() {
      ok.removeEventListener("click", handleOk)
      cancel.removeEventListener("click", handleCancel)
      dialog.close()
    }

    ok.addEventListener("click", handleOk)
    cancel.addEventListener("click", handleCancel)

    dialog.showModal()
  })
}

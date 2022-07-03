function openDirDialog(target) {
    electron.openSelectPathDialog()
    .then(path => {
        target.value = path
    })
    .catch(err => {
        ARIA2.main_alert("alert-error", err, 5000);
    })
}

$('#saveSettings').on("click", ()=>{
    electron.updateAria2Config("dir", $('#gsi-dir').val())
})
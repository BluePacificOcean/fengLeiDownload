function openDirDialog(target) {
    electron.openSelectPathDialog()
    .then(path => {
        target.value = path
    })
    .catch(err => {
        ARIA2.main_alert("alert-error", err, 5000);
    })
}

function updateAria2Config(target, key) {
    electron.updateAria2Config(key, target.value)
}
import { contextBridge, dialog } from 'electron'


function openSelectPathDialog() {
    dialog.showOpenDialog({
        properties: ["openDirectory"]
    }).then(val => {
        console.log(val)
    })
}

contextBridge.exposeInMainWorld("flApi", {
    openSelectPathDialog
})
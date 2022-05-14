import { contextBridge, dialog } from 'electron'

function openSelectPathDialog() {
    return dialog.showOpenDialog({
        properties: ["openDirectory"]
    })
}

contextBridge.exposeInMainWorld("FLApi", {
    openSelectPathDialog
})
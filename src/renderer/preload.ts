import { contextBridge, dialog, ipcRenderer } from 'electron'

async function openSelectPathDialog() {
    // console.log("openSelectPathDialog");
    const value = await dialog.showOpenDialog({
        properties: ["openDirectory"]
    })
    return ipcRenderer.send(value.filePaths[0])
}

contextBridge.exposeInMainWorld("electron", {
    openSelectPathDialog
})
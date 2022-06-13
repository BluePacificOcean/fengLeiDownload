import { contextBridge, ipcRenderer } from 'electron'

function openDirectory() {
    return new Promise((resolve, reject)=>{
        ipcRenderer.send('onOpenDirectory')
        ipcRenderer.once("onOpenDirectory", (e, path)=>{
            if(path == undefined) {
                reject("未选择任何文件夹")
            }
            resolve(path)
        })
    })
}

contextBridge.exposeInMainWorld("electron", {
    openDirectory
})
import { contextBridge, ipcRenderer } from 'electron'

function openSelectPathDialog(): Promise<string> {
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

function updateAria2Config(key:string, val:string) {
    return new Promise<void>((resolve, reject) => {
        ipcRenderer.send("onUpdateAria2Config", [key, val])
        ipcRenderer.once("onUpdateAria2Config", success=>{
            if(success) {
                resolve()
            }
            else {
                reject()
            }
        })
    })
}

contextBridge.exposeInMainWorld("electron", {
    openSelectPathDialog,
    updateAria2Config
})
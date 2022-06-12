"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
function openSelectPathDialog() {
    return new Promise((resolve, reject) => {
        electron_1.ipcRenderer.send('onOpenDirectory');
        electron_1.ipcRenderer.once("onOpenDirectory", (e, path) => {
            if (path == undefined) {
                reject("未选择任何文件夹");
            }
            resolve(path);
        });
    });
}
electron_1.contextBridge.exposeInMainWorld("electron", {
    openSelectPathDialog
});

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
function updateAria2Config(key, val) {
    return new Promise((resolve, reject) => {
        electron_1.ipcRenderer.send("onUpdateAria2Config", [key, val]);
        electron_1.ipcRenderer.once("onUpdateAria2Config", success => {
            if (success) {
                resolve();
            }
            else {
                reject();
            }
        });
    });
}
electron_1.contextBridge.exposeInMainWorld("electron", {
    openSelectPathDialog,
    updateAria2Config
});

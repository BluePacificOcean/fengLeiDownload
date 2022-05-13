"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
function openSelectPathDialog() {
    electron_1.dialog.showOpenDialog({
        properties: ["openDirectory"]
    }).then(val => {
        console.log(val);
    });
}
electron_1.contextBridge.exposeInMainWorld("flApi", {
    openSelectPathDialog
});

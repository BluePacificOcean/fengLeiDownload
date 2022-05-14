"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
function openSelectPathDialog() {
    return electron_1.dialog.showOpenDialog({
        properties: ["openDirectory"]
    });
}
electron_1.contextBridge.exposeInMainWorld("FLApi", {
    openSelectPathDialog
});

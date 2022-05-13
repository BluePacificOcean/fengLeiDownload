"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const child_process_1 = require("child_process");
const config_1 = require("./config");
let aria2Process;
let win;
function startAria2() {
    const process = (0, child_process_1.spawn)(config_1.ARIA2PATH, ['--conf-path', './aria2.conf'], { cwd: config_1.ARIA2DIR });
    process.stdout.once('data', (data) => {
        console.log(data.toString());
    });
    process.stderr.once('data', (data) => {
        console.log(data.toString());
    });
    return process;
}
function createWin() {
    return new electron_1.BrowserWindow({
        width: 1000,
        height: 750,
        autoHideMenuBar: true,
        webPreferences: {
            preload: config_1.PRELOADPATH
        }
    });
}
electron_1.app.whenReady()
    .then(() => {
    aria2Process = startAria2();
    win = createWin();
    win.loadFile("./src/page/index.html");
})
    .catch((error) => {
    console.error(error);
    electron_1.app.quit();
});
electron_1.app.on("quit", () => {
    aria2Process.kill();
});

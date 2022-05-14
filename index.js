"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const child_process_1 = require("child_process");
const config_1 = require("./config");
let aria2Process;
let win;
let tray;
function startAria2() {
    return new Promise((resolve, reject) => {
        aria2Process = (0, child_process_1.spawn)(config_1.ARIA2PATH, ['--conf-path', './aria2.conf'], { cwd: config_1.ARIA2DIR });
        aria2Process.stdout.once('data', (data) => {
            resolve(data.toString());
        });
        aria2Process.stderr.once('data', (data) => {
            reject(data.toString());
        });
    });
}
function createWin() {
    win = new electron_1.BrowserWindow({
        icon: config_1.LOGOPATH,
        width: 1000,
        height: 750,
        autoHideMenuBar: true,
        webPreferences: {
            preload: config_1.PRELOADPATH
        }
    });
    win.loadFile('src/page/index.html');
}
function openWin() {
    if (win !== undefined) {
        win.focus();
    }
    else {
        createWin();
    }
}
function createTray() {
    tray = new electron_1.Tray(config_1.LOGOPATH);
    tray.setToolTip("风雷下载器正在后台运行");
    tray.setContextMenu(electron_1.Menu.buildFromTemplate([
        { label: '打开程序', click() { openWin(); } },
        { label: '退出程序', click() { electron_1.app.quit(); } },
    ]));
    tray.on('double-click', () => {
        openWin();
    });
    return tray;
}
electron_1.app.whenReady()
    .then(() => startAria2())
    .then(() => {
    createTray();
    openWin();
})
    .catch((error) => {
    console.error(error);
    electron_1.app.quit();
});
electron_1.app.on("window-all-closed", () => {
    win = undefined;
});
electron_1.app.on("quit", () => {
    aria2Process.kill();
});

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const electron_1 = require("electron");
const index_1 = require("./config/index");
const index_2 = require("./aria2/index");
let win;
let tray;
function createWin() {
    win = new electron_1.BrowserWindow({
        icon: index_1.LOGOPATH,
        width: 1000,
        height: 750,
        autoHideMenuBar: true
    });
    win.loadFile('src/renderer/index.html');
    return win;
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
    tray = new electron_1.Tray(index_1.LOGOPATH);
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
electron_1.app.on("window-all-closed", () => {
    win = undefined;
});
electron_1.app.on("quit", () => {
    index_2.aria2Process.kill();
});
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield electron_1.app.whenReady();
        if (!electron_1.app.requestSingleInstanceLock()) {
            throw Error("程序已启动");
        }
        (0, index_2.startAria2)();
        createTray();
        openWin();
    });
}
exports.start = start;

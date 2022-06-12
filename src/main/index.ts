import { app, BrowserWindow, Menu, Tray, ipcMain, dialog } from 'electron'
import { PRELOADPATH, LOGOPATH } from './config/index'
import { startAria2, aria2Process } from './aria2/index'

let win: BrowserWindow | undefined
let tray: Tray

function createWin(): BrowserWindow {
    win = new BrowserWindow({
        icon: LOGOPATH,
        width: 1000,
        height: 750,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            preload: PRELOADPATH
        }
    })
    win.loadFile('src/renderer/index.html')
    return win
}

function openWin() {
    if (win !== undefined) {
        win.focus()
    }
    else {
        createWin()
    }
}

function createTray(): Tray {
    tray = new Tray(LOGOPATH)
    tray.setToolTip("风雷下载器正在后台运行")
    tray.setContextMenu(Menu.buildFromTemplate([
        { label: '打开程序', click() { openWin() } },
        { label: '退出程序', click() { app.quit() } },
    ]))
    tray.on('double-click', () => {
        openWin()
    })
    return tray
}

ipcMain.on('onOpenDirectory', async (e)=>{
    const path = await dialog.showOpenDialog({
        properties: ["openDirectory"]
    })
    e.reply('onOpenDirectory', path.filePaths[0])
})

app.on("window-all-closed", () => {
    win = undefined
})

app.on("quit", () => {
    aria2Process.kill()
})

export async function start() {
    await app.whenReady()
    if(!app.requestSingleInstanceLock()) {
        throw Error("程序已启动")
    }
    startAria2()
    createTray()
    openWin()
}
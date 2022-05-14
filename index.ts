import { app, BrowserWindow, Menu, Tray } from 'electron'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { ARIA2DIR, ARIA2PATH, PRELOADPATH, LOGOPATH } from './src/main/config/index'

let aria2Process: ChildProcessWithoutNullStreams
let win: BrowserWindow | undefined
let tray: Tray

function startAria2() {
    return new Promise((resolve, reject) => {
        aria2Process = spawn(ARIA2PATH, ['--conf-path', './aria2.conf'], { cwd: ARIA2DIR })
        aria2Process.stdout.once('data', (data: Buffer) => {
            resolve(data.toString())
        })
        aria2Process.stderr.once('data', (data: Buffer) => {
            reject(data.toString())
        })
    })
}

function createWin() {
    win = new BrowserWindow({
        icon: LOGOPATH,
        width: 1000,
        height: 750,
        autoHideMenuBar: true,
        webPreferences: {
            preload: PRELOADPATH
        }
    })
    win.loadFile('src/page/index.html')
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

app.whenReady()
    .then(() => startAria2())
    .then(() => {
        createTray()
        openWin()
    })
    .catch((error: Error) => {
        console.error(error);
        app.quit()
    })

app.on("window-all-closed", () => {
    win = undefined
})


app.on("quit", () => {
    aria2Process.kill()
})
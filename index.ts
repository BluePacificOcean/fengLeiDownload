import { app, BrowserWindow } from 'electron'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { ARIA2DIR, ARIA2PATH, PRELOADPATH } from './config'

let aria2Process: ChildProcessWithoutNullStreams;
let win: BrowserWindow;

function startAria2() {
    const process = spawn(ARIA2PATH, ['--conf-path', './aria2.conf'], { cwd: ARIA2DIR })
    process.stdout.once('data', (data: Buffer) => {
        console.log(data.toString())
    })
    process.stderr.once('data', (data: Buffer) => {
        console.log(data.toString())
    })
    return process
}

function createWin() {
    return new BrowserWindow({
        width: 1000,
        height: 750,
        autoHideMenuBar: true,
        webPreferences: {
            preload: PRELOADPATH
        }
    })
}

app.whenReady()
    .then(() => {
        aria2Process = startAria2()
        win = createWin()
        win.loadFile("./src/page/index.html")
    })
    .catch((error: Error) => {
        console.error(error);
        app.quit()
    })

app.on("quit", () => {
    aria2Process.kill()
})
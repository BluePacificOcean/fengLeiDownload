import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'

const assetsDir = join(process.cwd(), process.env.NODE_ENV != 'development' ? 'resources' : '')
const aria2Dir = join(assetsDir, '/aria2/')
const aria2Path = join(assetsDir, '/aria2/aria2c')
let aria2_process: ChildProcessWithoutNullStreams;
let win: BrowserWindow;

function startAria2() {
    aria2_process = spawn(aria2Path, ['--conf-path', './aria2.conf'], { cwd: aria2Dir })
    aria2_process.stdout.on('data', (data: Buffer) => {
        console.log(data.toString())
    })
    aria2_process.stderr.on('data', (data: Buffer) => {
        console.log(data.toString())
    })
}

function createWin() {
    return new BrowserWindow({
        width: 1000,
        height: 750
    })
}

app.whenReady()
    .then(() => {
        startAria2()
        win = createWin()
        win.loadFile("./src/index.html")
    })
    .catch(error => {
        console.error(error);
        app.quit()
    })

app.on("window-all-closed", () => {
    // aria2_process.kill()
    app.quit()
})
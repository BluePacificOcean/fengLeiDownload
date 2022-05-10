import { app, BrowserWindow } from 'electron'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'

let aria2_process: ChildProcessWithoutNullStreams = undefined
let win: BrowserWindow = undefined
function startAria2() {
    aria2_process = spawn(`.\\aria2\\aria2c`, ['--conf-path', '.\\config\\aria2.conf'])
    aria2_process.stdout.on('data', (data:Buffer) => {
        console.log(data.toString())
    })
    aria2_process.stderr.on('data', (data:Buffer) => {
        console.log(data.toString())
    })
}

function createWin(): BrowserWindow {
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
    })

app.on("window-all-closed", ()=>{
    aria2_process.kill()
    app.quit()
})
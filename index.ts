import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { spawn } from 'child_process'

const assetsPath = join(`${process.cwd()}`, process.env.NODE_ENV != 'development' ? 'resources' : '')
const aria2Dir = join(assetsPath, '/aria2/')
const aria2Path = join(assetsPath, '/aria2/aria2c')
console.log(process.env.NODE_ENV)
let aria2_process = undefined
let win = undefined

function startAria2() {
    aria2_process = spawn(aria2Path, ['--conf-path', './aria2.conf'], { cwd: aria2Dir })
    aria2_process.stdout.on('data', (data:Buffer) => {
        console.log(data.toString())
    })
    aria2_process.stderr.on('data', (data:Buffer) => {
        console.log(data.toString())
    })
}

function createWin() {
    return new BrowserWindow({
        width: 1000,
        height: 750
    })
}

app.setAsDefaultProtocolClient('magnet')
app.on('open-url', (e, url) => {
    
})
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

app.on("window-all-closed", ()=>{
    aria2_process.kill()
    app.quit()
})
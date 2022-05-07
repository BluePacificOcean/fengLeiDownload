import { app, BrowserWindow } from 'electron'
import { exec, execFile } from 'child_process'

function startAria2() {
    return new Promise((resolve, reject) => {
        exec(`.\\aria2\\aria2c --conf-path .\\aria2\\aria2.conf`, (error, out, err)=>{
            if(error){
                reject(error)
            }
            else {
                resolve(out)
            }
        })
    })
}


function createWin() {
    return new BrowserWindow({
        // frame: false
        width: 1000,
        height: 750
    }).loadFile("./src/index.html")
}

app.whenReady()
.then(()=> {
    startAria2()
    createWin()
})
.catch(error => {
    console.log(error);
})
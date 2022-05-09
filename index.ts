import { app, BrowserWindow } from 'electron'
import { exec } from 'child_process'
import { stat, writeFile } from 'fs/promises'
import { get } from 'https'


function downloadAria2(): Promise<void> {
    console.group('download start')
    return new Promise((resolve, reject) => {
        get(`https://github.com/aria2/aria2/releases/download/release-1.36.0/aria2-1.36.0-win-32bit-build1.zip`, {
            port: 443,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39'
            },
        }, res => {
            res.on("data", data => {
                console.log(data);
                console.groupEnd()
                writeFile('aria2.zip', data).then(() => { resolve() })
            })
        }).on("error", e => {
            reject(e)
        })
    })
}

function startAria2(): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(`.\\aria2\\aria2c --conf-path .\\config\\aria2.conf`, (error, out, err) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(out)
            }
        })
    })
}


function createWin() {
    console.log("create");
    return new BrowserWindow({
        // frame: false
        width: 1000,
        height: 750
    }).loadFile("./src/index.html")
}

app.whenReady()
    // .then(() => stat('./aria2'))
    // .then(stats => stats.isDirectory() ? Promise.resolve() : downloadAria2()
    .then(() => {
        startAria2()
        createWin()
    })
    .catch(error => {
        // alert(error)
        console.error(error);
    })
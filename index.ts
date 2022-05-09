import { app, BrowserWindow } from 'electron'
import { exec } from 'child_process'
import { stat, writeFile } from 'fs'
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
                writeFile('aria2.zip', data, () => { resolve() })
            })
        }).on("error", e => {
            // alert(e)
            reject(e)
        })
    })
}

function startAria2(): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(`.\\aria2\\aria2c --conf-path .\\conf\\aria2.conf`, (error, out, err) => {
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
    return new BrowserWindow({
        // frame: false
        width: 1000,
        height: 750
    }).loadFile("./src/index.html")
}

app.whenReady()
    .then(() => stat('./aria2', (err, stats) => {
        if (err || !stats.isDirectory()) {
            return downloadAria2()
        }
        else {
            return Promise.resolve()
        }
    }))
    .then(() => {
        // startAria2()
        createWin()
    })
    .catch(error => {
        // alert(error)
        console.error(error);
    })
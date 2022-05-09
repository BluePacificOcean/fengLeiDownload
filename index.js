"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var child_process_1 = require("child_process");
var promises_1 = require("fs/promises");
var https_1 = require("https");
function downloadAria2() {
    console.group('download start');
    return new Promise(function (resolve, reject) {
        (0, https_1.get)("https://github.com/aria2/aria2/releases/download/release-1.36.0/aria2-1.36.0-win-32bit-build1.zip", {
            port: 443,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39'
            }
        }, function (res) {
            res.on("data", function (data) {
                console.log(data);
                console.groupEnd();
                (0, promises_1.writeFile)('aria2.zip', data).then(function () { resolve(); });
            });
        }).on("error", function (e) {
            reject(e);
        });
    });
}
function startAria2() {
    return new Promise(function (resolve, reject) {
        (0, child_process_1.exec)(".\\aria2\\aria2c --conf-path .\\config\\aria2.conf", function (error, out, err) {
            if (error) {
                reject(error);
            }
            else {
                resolve(out);
            }
        });
    });
}
function createWin() {
    console.log("create");
    return new electron_1.BrowserWindow({
        // frame: false
        width: 1000,
        height: 750
    }).loadFile("./src/index.html");
}
electron_1.app.whenReady()
    // .then(() => stat('./aria2'))
    // .then(stats => stats.isDirectory() ? Promise.resolve() : downloadAria2()
    .then(function () {
    startAria2();
    createWin();
})["catch"](function (error) {
    // alert(error)
    console.error(error);
});

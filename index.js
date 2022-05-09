"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var child_process_1 = require("child_process");
var fs_1 = require("fs");
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
                (0, fs_1.writeFile)('aria2.zip', data, function () { resolve(); });
            });
        }).on("error", function (e) {
            // alert(e)
            reject(e);
        });
    });
}
function startAria2() {
    return new Promise(function (resolve, reject) {
        (0, child_process_1.exec)(".\\aria2\\aria2c --conf-path .\\conf\\aria2.conf", function (error, out, err) {
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
    return new electron_1.BrowserWindow({
        // frame: false
        width: 1000,
        height: 750
    }).loadFile("./src/index.html");
}
electron_1.app.whenReady()
    .then(function () { return (0, fs_1.stat)('./aria2', function (err, stats) {
    if (err || !stats.isDirectory()) {
        return downloadAria2();
    }
    else {
        return Promise.resolve();
    }
}); })
    .then(function () {
    // startAria2()
    createWin();
})["catch"](function (error) {
    // alert(error)
    console.error(error);
});

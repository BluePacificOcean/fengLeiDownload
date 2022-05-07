"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var child_process_1 = require("child_process");
function startAria2() {
    return new Promise(function (resolve, reject) {
        (0, child_process_1.exec)(".\\aria2\\aria2c --conf-path .\\aria2\\aria2.conf", function (error, out, err) {
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
    .then(function () {
    startAria2();
    createWin();
})["catch"](function (error) {
    console.log(error);
});

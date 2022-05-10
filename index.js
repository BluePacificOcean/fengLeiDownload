"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path_1 = require("path");
var child_process_1 = require("child_process");
var assetsPath = (0, path_1.join)("".concat(process.cwd()), process.env.NODE_ENV != 'development' ? 'resources' : '');
var aria2Dir = (0, path_1.join)(assetsPath, '/aria2/');
var aria2Path = (0, path_1.join)(assetsPath, '/aria2/aria2c');
console.log(process.env.NODE_ENV);
var aria2_process = undefined;
var win = undefined;
function startAria2() {
    aria2_process = (0, child_process_1.spawn)(aria2Path, ['--conf-path', './aria2.conf'], { cwd: aria2Dir });
    aria2_process.stdout.on('data', function (data) {
        console.log(data.toString());
    });
    aria2_process.stderr.on('data', function (data) {
        console.log(data.toString());
    });
}
function createWin() {
    return new electron_1.BrowserWindow({
        width: 1000,
        height: 750
    });
}
electron_1.app.setAsDefaultProtocolClient('magnet');
electron_1.app.on('open-url', function (e, url) {
});
electron_1.app.whenReady()
    .then(function () {
    startAria2();
    win = createWin();
    win.loadFile("./src/index.html");
})["catch"](function (error) {
    console.error(error);
    electron_1.app.quit();
});
electron_1.app.on("window-all-closed", function () {
    aria2_process.kill();
    electron_1.app.quit();
});

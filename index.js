"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var child_process_1 = require("child_process");
var aria2_process = undefined;
var win = undefined;
function startAria2() {
    aria2_process = (0, child_process_1.spawn)(".\\aria2\\aria2c", ['--conf-path', '.\\config\\aria2.conf']);
    aria2_process.stdout.on('data', function (data) {
        console.log(data.toString());
    });
    aria2_process.stderr.on('data', function (data) {
        console.log(data.toString());
    });
}
function createWin() {
    return new electron_1.BrowserWindow({
        // frame: false
        width: 1000,
        height: 750
    });
}
electron_1.app.whenReady()
    .then(function () {
    startAria2();
    win = createWin();
    win.loadFile("./src/index.html");
})["catch"](function (error) {
    console.error(error);
});
electron_1.app.on("window-all-closed", function () {
    aria2_process.kill();
    electron_1.app.quit();
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAria2 = exports.aria2Process = void 0;
const child_process_1 = require("child_process");
const index_1 = require("../config/index");
function startAria2() {
    return new Promise((resolve, reject) => {
        exports.aria2Process = (0, child_process_1.spawn)(index_1.ARIA2PATH, ['--conf-path', './aria2.conf'], { cwd: index_1.ARIA2DIR });
        exports.aria2Process.stdout.once('data', (data) => {
            resolve(data.toString());
        });
        exports.aria2Process.stderr.once('data', (data) => {
            reject(data.toString());
        });
    });
}
exports.startAria2 = startAria2;

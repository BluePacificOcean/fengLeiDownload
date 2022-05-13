"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeConfig = exports.readConfig = void 0;
const fs_1 = require("fs");
const config_1 = require("../../config");
function readConfig() {
    const config = new Map();
    return new Promise((resolve, reject) => {
        (0, fs_1.readFile)(`${config_1.ARIA2DIR}/aria2.conf`, { encoding: 'utf8' }, (error, data) => {
            if (error) {
                reject(error);
            }
            const lines = data.split('\n');
            for (let idx = 0; idx < lines.length; ++idx) {
                const row = lines[idx];
                if (row.length == 0 || row[0] === '#') {
                    continue;
                }
                const [key, val] = row.split('=');
                config.set(key, val);
            }
            resolve(config);
        });
    });
}
exports.readConfig = readConfig;
function writeConfig(config) {
    // todo
}
exports.writeConfig = writeConfig;

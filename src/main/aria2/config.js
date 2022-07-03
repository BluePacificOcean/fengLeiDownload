"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfig = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const index_1 = require("../config/index");
const configPath = (0, path_1.join)(index_1.ARIA2DIR, 'aria2.conf');
function setConfig(key, val) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            updateConfigFile(key, val);
        }
        catch (error) {
            return false;
        }
        return true;
    });
}
exports.setConfig = setConfig;
function updateConfigFile(key, val) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileHandle = yield (0, promises_1.open)(configPath, 'r+');
        let content = yield fileHandle.readFile({
            encoding: 'utf-8'
        });
        let reg = new RegExp(`^${key}=.*?\$`, 'm');
        content = content.replace(reg, `${key}=${val}`);
        yield fileHandle.write(content, 0, 'utf-8');
    });
}

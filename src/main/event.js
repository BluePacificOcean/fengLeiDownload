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
const electron_1 = require("electron");
const aria2_1 = require("./aria2");
electron_1.ipcMain.on('onOpenDirectory', (e) => __awaiter(void 0, void 0, void 0, function* () {
    const path = yield electron_1.dialog.showOpenDialog({
        properties: ["openDirectory"]
    });
    e.reply('onOpenDirectory', path.filePaths[0]);
}));
electron_1.ipcMain.on('onUpdateAria2Config', (e, [key, val]) => __awaiter(void 0, void 0, void 0, function* () {
    e.reply('onUpdateAria2Config', yield (0, aria2_1.setConfig)(key, val));
}));

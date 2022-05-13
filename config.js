"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRELOADPATH = exports.ARIA2PATH = exports.ARIA2DIR = exports.ASSETDIR = void 0;
const path_1 = require("path");
exports.ASSETDIR = (0, path_1.join)(process.cwd(), process.env.NODE_ENV != 'development' ? 'resources' : '', '/assets');
exports.ARIA2DIR = (0, path_1.join)(exports.ASSETDIR, '/aria2');
exports.ARIA2PATH = (0, path_1.join)(exports.ARIA2DIR, '/aria2c');
exports.PRELOADPATH = (0, path_1.join)(process.cwd(), '/src/preload/index.js');

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("node:http"));
const fs_1 = require("fs");
const homePage = (0, fs_1.readFileSync)('./dist/index.html');
const homeStyles = (0, fs_1.readFileSync)('./dist/styles.css');
const homeImage = (0, fs_1.readFileSync)('./dist/logo.svg');
const homeLogic = (0, fs_1.readFileSync)('./dist/browser-app.js');
const server = http.createServer((req, res) => {
    const url = req.url;
    console.log(req.url);
    // home page
    if (url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write(homePage);
        res.end();
    }
    // about page
    else if (url === '/about') {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write('<h1>About page</h1>');
        res.end();
    }
    // style
    else if (url === "/styles.css") {
        res.writeHead(200, { "content-type": "text/css" });
        res.write(homeStyles);
        res.end();
    }
    // logo
    else if (url === "/logo.svg") {
        res.writeHead(200, { "content-type": "image/svg+xml" });
        res.write(homeImage);
        res.end();
    }
    // javascript logic
    else if (url === "/browser-app.js") {
        res.writeHead(200, { "content-type": "text/javascript" });
        res.write(homeLogic);
        res.end();
    }
    // 404
    else {
        res.writeHead(404, { 'content-type': 'text/html' });
        res.write('<h1> 404... page not found :-(</h1>');
        res.end();
    }
});
server.listen(5000, () => {
    console.log('Server running on port 5000');
});

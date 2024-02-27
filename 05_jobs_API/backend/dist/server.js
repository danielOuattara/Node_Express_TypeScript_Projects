"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const connect_1 = require("./database/connect");
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || 3000);
app_1.default.set("port", port);
const errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === "string" ? "pipe" + address : "port" + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + "requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + "is already in use.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};
const server = http_1.default.createServer(app_1.default);
server.on("error", errorHandler);
server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe" + address : port;
    console.log("Listening on port " + bind);
    if (process.env.NODE_ENV === "development") {
        console.log(`Server is running on http://localhost:${port}/`);
    }
});
(0, connect_1.connectToDB)(process.env.MONGO_URI)
    .then(() => {
    console.log(`Connection to database "${process.env.MONGO_DATABASE}" : Success !`);
    server.listen(port);
})
    .catch((err) => console.log(err.message));

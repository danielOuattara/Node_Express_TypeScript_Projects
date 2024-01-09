"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const peopleRouter_1 = __importDefault(require("./routes/peopleRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const app = (0, express_1.default)();
// middleware: output the time for the server to send the response
app.use((0, morgan_1.default)("tiny"));
// middleware: serves static assets in /public
app.use(express_1.default.static("./public"));
// parse incoming form data
app.use(express_1.default.urlencoded({ extended: false }));
// parse incoming json data
app.use(express_1.default.json());
// router
app.use("/api/people", peopleRouter_1.default);
app.use("/login", authRouter_1.default);
app.listen(5000, () => {
    console.log("Server is listening on port http://localhost:5000....");
});

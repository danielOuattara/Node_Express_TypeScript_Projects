"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainControllers_1 = require("./../controllers/mainControllers");
const router = express_1.default.Router();
router.route("/login").post(mainControllers_1.login);
router.route("/dashboard").get(mainControllers_1.dashboard);
exports.default = router;

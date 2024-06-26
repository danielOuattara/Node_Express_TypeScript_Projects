"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { login, dashboard } = require("../controllers/mainControllers");
const authMiddleware = require("../middleware/auth");
router.route("/login").post(login);
router.route("/dashboard").get(authMiddleware, dashboard);
module.exports = router;

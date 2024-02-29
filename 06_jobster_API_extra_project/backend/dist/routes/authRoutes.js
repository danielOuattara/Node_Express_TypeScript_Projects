"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("./../controllers/authControllers");
const middlewares_1 = require("../middlewares");
const express_rate_limit_1 = require("express-rate-limit");
const router = express_1.default.Router();
const authLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 7 * 60 * 1000,
    max: 10,
    message: { code: 429, msg: "Too many connection; Try later !" },
    limit: 5,
});
router.post("/register", authLimiter, authControllers_1.register);
router.post("/login", authLimiter, authControllers_1.login);
router.patch("/updateUser", middlewares_1.auth, middlewares_1.testUser, authControllers_1.updateUser);
exports.default = router;

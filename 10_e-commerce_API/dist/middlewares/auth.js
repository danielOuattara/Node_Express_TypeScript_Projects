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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const errors_1 = require("../errors");
const jwt_1 = require("./../utilities/jwt");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const authUser = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const access_token = req.signedCookies.access_token;
    if (!access_token || !access_token.startsWith("Bearer")) {
        throw new errors_1.UnauthenticatedError("Request Denied !");
    }
    try {
        const token = access_token.split(" ")[1];
        const payload = (0, jwt_1.isTokenValid)(token);
        const user = yield UserModel_1.default.findById(payload.userId).select("-password");
        if (user) {
            const isTestUser = user._id.equals(process.env.TEST_USER_ID);
            req.user = Object.assign(Object.assign({}, user.toObject()), { isTestUser });
        }
        next();
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError("Request Denied !");
    }
});
exports.authUser = authUser;

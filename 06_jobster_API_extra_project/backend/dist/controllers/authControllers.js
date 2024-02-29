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
exports.updateUser = exports.login = exports.register = void 0;
const UserModel_1 = __importDefault(require("./../models/UserModel"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("./../errors");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
            token: user.createJWT(),
        },
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
        throw new errors_1.BadRequestError("Please provide: email and password");
    }
    const user = yield UserModel_1.default.findOne({ email: req.body.email });
    if (!user) {
        throw new errors_1.UnauthenticatedError("User unknown 2!");
    }
    const validPassword = yield user.comparePassword(req.body.password);
    if (!validPassword) {
        throw new errors_1.UnauthenticatedError("User unknown 3!");
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
            token: user.createJWT(),
        },
    });
});
exports.login = login;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email ||
        !req.body.name ||
        !req.body.lastName ||
        !req.body.location) {
        throw new errors_1.BadRequestError("Email, Name, LastName and Location values are all required");
    }
    const user = yield UserModel_1.default.findById(req.user._id);
    if (!user) {
        throw new errors_1.NotFoundError(`No User found ${req.user.name}`);
    }
    if (user._id.equals(process.env.TEST_USER_ID)) {
        req.body.email = user.email;
    }
    user.email = req.body.email;
    user.name = req.body.name;
    user.lastName = req.body.lastName;
    user.location = req.body.location;
    yield user.save();
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        user: {
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            name: user.name,
            token: user.createJWT(),
        },
    });
});
exports.updateUser = updateUser;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.customErrorHandler = void 0;
const not_found_1 = __importDefault(require("./not-found"));
exports.notFound = not_found_1.default;
const errors_handler_1 = __importDefault(require("./errors-handler"));
exports.customErrorHandler = errors_handler_1.default;

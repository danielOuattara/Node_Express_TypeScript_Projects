"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeStripAPI = exports.checkAuthOrAdmin = exports.attachCookiesToResponse = void 0;
const cookies_1 = require("./cookies");
Object.defineProperty(exports, "attachCookiesToResponse", { enumerable: true, get: function () { return cookies_1.attachCookiesToResponse; } });
const checkAuthOrAdmin_1 = require("./checkAuthOrAdmin");
Object.defineProperty(exports, "checkAuthOrAdmin", { enumerable: true, get: function () { return checkAuthOrAdmin_1.checkAuthOrAdmin; } });
const fakeStripeAPI_1 = require("./fakeStripeAPI");
Object.defineProperty(exports, "fakeStripAPI", { enumerable: true, get: function () { return fakeStripeAPI_1.fakeStripAPI; } });

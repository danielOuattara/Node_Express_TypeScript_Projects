"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachCookiesToResponse = void 0;
const jwt_1 = require("./jwt");
const attachCookiesToResponse = (res, payload) => {
    const token = (0, jwt_1.createJWT)(payload);
    return res.cookie("access_token", "Bearer " + token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        signed: true,
    });
};
exports.attachCookiesToResponse = attachCookiesToResponse;

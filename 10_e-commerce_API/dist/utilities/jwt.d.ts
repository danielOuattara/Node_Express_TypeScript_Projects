import { ITokenPayload } from "../custom";
export declare const createJWT: (payload: ITokenPayload) => string;
export declare const isTokenValid: (token: string) => ITokenPayload;

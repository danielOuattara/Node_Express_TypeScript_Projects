import { ITokenPayload } from "../@types/custom";
export declare const createJWT: (payload: ITokenPayload) => string;
export declare const isTokenValid: (token: string) => ITokenPayload;

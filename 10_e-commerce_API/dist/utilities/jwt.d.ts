import { IUserTokenPayload } from "../@types/user";
export declare const createJWT: (payload: IUserTokenPayload) => string;
export declare const isTokenValid: (token: string) => IUserTokenPayload;

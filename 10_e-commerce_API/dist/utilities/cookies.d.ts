import { Response } from "express";
import { IUserTokenPayload } from "../@types/user";
export declare const attachCookiesToResponse: (res: Response, payload: IUserTokenPayload) => Response<any, Record<string, any>>;
export declare const destroyCookiesInResponse: (res: Response) => Response<any, Record<string, any>>;

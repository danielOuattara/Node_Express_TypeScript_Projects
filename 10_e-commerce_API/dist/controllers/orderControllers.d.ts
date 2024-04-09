import { RequestHandler } from "express";
import { IParamsDictionary, IReqCreateOrder, IUpdateOrderReqBody } from "../@types/order";
export declare const createOrder: RequestHandler<{}, {}, IReqCreateOrder>;
export declare const getAllOrders: RequestHandler;
export declare const getSingleOrder: RequestHandler;
export declare const getCurrentUserOrders: RequestHandler;
export declare const updateOrder: RequestHandler<IParamsDictionary, {}, IUpdateOrderReqBody>;

import { IOrder } from "../order/order.interface";

export interface IUserInfo {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phoneNumber: string | null;
    address: any[]; // Changed to any[] to denote an array of any type
    orders: IOrder[]; // Changed to IOrder[] to denote an array of IOrder
    uid:string;
}

export interface IIUserInfoResponse extends IUserInfo {
    id: number | string;
}
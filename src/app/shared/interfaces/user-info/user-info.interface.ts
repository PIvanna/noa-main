export interface IUserInfo {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phoneNumber: string | null;
    address: [] | null,
    orders: [] | null
}

export interface IIUserInfoResponse extends IUserInfo {
    id: number | string;
}

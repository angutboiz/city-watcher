export interface IUser {
    _id: string;
    email: string;
    password: string;
    verify: boolean;
    zone: string;
    roles: string;
    status: boolean;
    profilePicture: string;
    phoneNumber: number;
    otp: number;
    expire_otp: string;
    refreshToken: string;
    createdAt: string;
    updatedAt: string;
    displayName: string;
}

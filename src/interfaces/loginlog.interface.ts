import type { IBaseInterface } from "./base.interface";

export interface ILoginLog extends IBaseInterface {
    loginTime: string;
    logOutTime?: string | null;
    clientIp: string;
    deviceType: string;
    os: string;
    browser: string;
    deviceId: string;
    authId: string; 
}
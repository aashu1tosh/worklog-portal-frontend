import type { IBaseInterface } from "@/interfaces/base.interface"

export interface ICompany extends IBaseInterface {
    name: string;
    address: string;
    email: string;
    phone: string;
}
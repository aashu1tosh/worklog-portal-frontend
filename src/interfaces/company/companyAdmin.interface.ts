import type { IBaseInterface } from "@/interfaces/base.interface";
import type { IAuth } from "../auth/auth.interface";
import type { ICompany } from "./company.interface";

export interface ICompanyAdmin extends IBaseInterface {
    firstName?: string;
    middleName: string;
    lastName?: string;
    auth?: IAuth;
    company?: ICompany
}
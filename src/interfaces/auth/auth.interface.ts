import type { Role } from "@/constants/enum";
import type { IAdmin } from "../admin/admin.interface";
import type { IBaseInterface } from "../base.interface";
import type { ICompanyAdmin } from "../company/companyAdmin.interface";

export interface IAuth extends IBaseInterface {
    email: string;
    phone?: string;
    role: Role;
    admin?: IAdmin;
    companyAdmin?: ICompanyAdmin;
}
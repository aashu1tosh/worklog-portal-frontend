import type { Role } from "@/constants/enum";
import type { IAdmin } from "../admin/admin.interface";
import type { IBaseInterface } from "../base.interface";
import type { ICompanyAdmin } from "../company/companyAdmin.interface";
import type { ICompanyEmployee } from "../company/companyEmployee.interface";
import type { IMedia } from "../media/media.interface";

export interface IAuth extends IBaseInterface {
    email: string;
    phone?: string;
    role: Role;
    admin?: IAdmin;
    companyAdmin?: ICompanyAdmin;
    companyEmployee?: ICompanyEmployee;
    media?: IMedia[];
}
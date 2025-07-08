import type { IBaseInterface } from "@/interfaces/base.interface";
import type { ICompany } from "../company.interface";

export interface IWorklog extends IBaseInterface {
    taskCompleted: string;
    taskPlanned: string;
    challengingTask?: string;
    companyEmployee?: ICompany;
}

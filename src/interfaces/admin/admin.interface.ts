import type { IBaseInterface } from "../base.interface";

export interface IAdmin extends IBaseInterface {
  firstName: string;
  lastName: string;
  middleName?: string;
}

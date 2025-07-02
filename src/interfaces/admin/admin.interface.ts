import type { IAuth } from "../auth/auth.interface";
import type { IBaseInterface } from "../base.interface";

export interface IAdmin extends IBaseInterface {
  firstName: string;
  lastName: string;
  middleName?: string;
  auth?: IAuth
}

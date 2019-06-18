import { IGroup } from "./Group";
import { IUser } from "./User";
import { IRole } from "./Role";

export interface IUsergroup {
  group: IGroup
  id:number
  joinedDate: Date | string | number
  user: IUser
  role: IRole
}
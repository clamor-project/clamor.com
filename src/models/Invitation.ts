import { IUsergroup } from "./Usergroup";
import { IUser } from "./User";

export interface IInvitation {
  host: IUsergroup
  id:number
  subject:IUser
}
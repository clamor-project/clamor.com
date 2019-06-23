import { IUsergroup } from "./Usergroup";

export interface IGroupMessage {
  author: IUsergroup
  id:number
  content:string
  dateCreated:Date | string | number
}
import { IUsergroup } from "./Usergroup";

export interface IGroupmessage {
  author: IUsergroup
  id:number
  content:string
  dateCreated:Date | string | number
}
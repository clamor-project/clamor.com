import { IUsergroup } from "./Usergroup";
import { IGroup } from "./Group";

export interface IEvent {
  id:number
  creator:IUsergroup
  dateOf:Date | string | number
  datePosted: Date | string | number
  description: string
  groupId:IGroup
  live:boolean
}
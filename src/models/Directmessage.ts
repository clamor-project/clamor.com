import { IFriending } from "./Friending";

export interface IDirectmessage {
  id:number
  friends:IFriending
  content:string
  sentDate:Date | string | number
}
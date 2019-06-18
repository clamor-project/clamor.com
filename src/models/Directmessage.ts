import { IFriending } from "./Friending";

export interface IDirectmessage {
  id:number
  friends:IFriending
  content:string
  sendDate:Date | string | number
}
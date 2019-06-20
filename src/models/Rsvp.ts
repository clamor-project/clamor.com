import { IUsergroup } from "./Usergroup";
import { IEvent } from "./Event";

export interface IRsvp {
  id:number
  attendee:IUsergroup
  event:IEvent
}
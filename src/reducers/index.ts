import { CurrentUserReducer } from "./login.reducer";
import { SearchedUserReducer } from "./user.reducer";
import { CurrentGroupReducer } from "./groups.reducer";
import { combineReducers } from "redux";
import { SearchedGroupReducer } from "./group-search.reducer";
import { IUser } from "../models/User";
import { IUsergroup } from "../models/Usergroup";
import { IGroup } from "../models/Group";
import { FriendReducer } from "./friend.reducer";
import { EventReducer } from "./event.reducer";
import { IEvent } from "../models/Event";
import { IFriending } from "../models/Friending";
import { IDirectmessage } from "../models/Directmessage";
import { IGroupMessage } from "../models/GroupMessage";
import { GroupMessageReducer } from "./group-message.reducer";


export interface ICurrentUserState{
    groups: IUsergroup[],
    self: IUser
}

export interface IEventState {
    eventList: IEvent[];
    currentEvent: IEvent;
}

export interface ICurrentGroupState extends IGroup{

}

export interface ISearchedUsersState{
    manyUsers: IUser[]
    selectUser: IUser
    friends : IFriendState[]
}

export interface ISearchedGroupsState{
    groupList: IGroup[]
}

export interface IFriendState {
    mutualFriends: IFriending[]
    friendRequests: IFriending[]
    friendables: IUser[]
    messages: IDirectmessage[]
}

export interface IGroupMessageState {
    messageList?: IGroupMessage[]
}

//all the states we are following
export interface IState{
    CurrentUser: ICurrentUserState
    CurrentGroup:ICurrentGroupState
    UserFinder: ISearchedUsersState
    GroupFinder: ISearchedGroupsState
    FriendState: IFriendState
    EventState: IEventState
    GroupMessageState: IGroupMessageState
}

//
export const state = combineReducers<IState>({
    CurrentUser: CurrentUserReducer,
    CurrentGroup: CurrentGroupReducer,
    UserFinder: SearchedUserReducer,
    GroupFinder: SearchedGroupReducer,
    FriendState: FriendReducer,
    EventState: EventReducer,
    GroupMessageState: GroupMessageReducer
})
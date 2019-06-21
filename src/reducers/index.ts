import { CurrentUserReducer } from "./login.reducer";
import { SearchedUserReducer } from "./user.reducer";
import { CurrentGroupReducer } from "./groups.reducer";
import { combineReducers } from "redux";
import { SearchedGroupReducer } from "./group-search.reducer";
import { IUser } from "../models/User";
import { IUsergroup } from "../models/Usergroup";
import { IGroup } from "../models/Group";
import { FriendReducer } from "./friend.reducer";
import { IFriending } from "../models/Friending";

export interface ICurrentUserState{
    groups: IUsergroup[],
    self: IUser
}

export interface ICurrentGroupState extends IGroup{

}

export interface ISearchedUsersState{

}

export interface ISearchedGroupsState{
    groupList: IGroup[]
}

export interface IFriendState {
    mutualFriends: IFriending[]
    friendRequests: IFriending[]
    friendables: IUser[]
}

//all the states we are following
export interface IState{
    CurrentUser: ICurrentUserState
    CurrentGroup:ICurrentGroupState
    UserFinder: ISearchedUsersState
    GroupFinder: ISearchedGroupsState
    FriendState: IFriendState
}

//
export const state = combineReducers<IState>({
    CurrentUser: CurrentUserReducer,
    CurrentGroup: CurrentGroupReducer,
    UserFinder: SearchedUserReducer,
    GroupFinder: SearchedGroupReducer,
    FriendState: FriendReducer
})
import { CurrentUserReducer } from "./login.reducer";
import { SearchedUserReducer } from "./user.reducer";
import { CurrentGroupReducer } from "./groups.reducer";
import { combineReducers } from "redux";
import { SearchedGroupReducer } from "./group-search.reducer";
import { IUser } from "../models/User";
import { IUsergroup } from "../models/Usergroup";
import { IGroup } from "../models/Group";

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

//all the states we are following
export interface IState{
    CurrentUser: ICurrentUserState
    CurrentGroup:ICurrentGroupState
    UserFinder: ISearchedUsersState
    GroupFinder: ISearchedGroupsState
}

//
export const state = combineReducers<IState>({
    CurrentUser: CurrentUserReducer,
    CurrentGroup: CurrentGroupReducer,
    UserFinder: SearchedUserReducer,
    GroupFinder: SearchedGroupReducer
})
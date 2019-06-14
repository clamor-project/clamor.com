import { CurrentUserReducer } from "./login.reducer";
import { SearchedUserReducer } from "./user.reducer";
import { CurrentGroupReducer } from "./groups.reducer";
import { combineReducers } from "redux";
import { SearchedGroupReducer } from "./group-search.reducer";
import { user } from "../models/user";

export interface ICurrentUserState{
    currentUser: user
}

export interface ICurrentGroupState{

}

export interface ISearchedUsersState{

}

export interface ISearchedGroupsState{

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
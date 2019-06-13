import { CurrentUserReducer } from "./login.reducer";
import { SearchedUserReducer } from "./user.reducer";
import { SearchedGroupReducer } from "./groups.reducer";
import { combineReducers } from "redux";

export interface ICurrentUserState{

}

export interface ISearchedUsersState{

}

export interface ISearchedGroupsState{

}

//all the states we are following
export interface IState{
    CurrentUser: ICurrentUserState
    UserFinder: ISearchedUsersState
    GroupFinder: ISearchedGroupsState
}

//
export const state = combineReducers<IState>({
    CurrentUser: CurrentUserReducer,
    UserFinder: SearchedUserReducer,
    GroupFinder: SearchedGroupReducer
})
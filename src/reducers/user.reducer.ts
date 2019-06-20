import {ISearchedUsersState} from '.'
import {IUser} from '../models/User'
import { userTypes } from '../actions/user.action';

const initialState: ISearchedUsersState = {
    manyUsers: [],
    selectUser: undefined
}


export const SearchedUserReducer = (state = initialState, action) => {
    switch(action.type){
        case userTypes.Found_User:
            return{
                ...state,
                selectUser : action.payload
            }

        default:
            return state
    }
}
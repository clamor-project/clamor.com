import {ISearchedUsersState} from '.'
import {IUser} from '../models/User'
import { userTypes } from '../actions/user.action';

const initialState: ISearchedUsersState = {
    manyUsers: [],
    selectUser: {
        id: 0,
        username: "",
        email: "",
        dateOfBirth: "",
        password: ""
    }
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
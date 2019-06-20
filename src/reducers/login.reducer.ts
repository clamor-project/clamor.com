import { ICurrentUserState } from ".";
import { loginTypes } from "../actions/login.action";

const initialState: ICurrentUserState = {
    groups: [],
    self: {
        id:0,
        username:'',
        email:'',
        dateOfBirth: '2000-01-01'
    }
}


export const CurrentUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case loginTypes.Set_User_Groups:
            return {
                ...state,
                groups: action.payload
            }
        case loginTypes.Set_Current_User:
            return {
                ...state,
                self: action.payload
            }
        default:
            return state
    }
}
import { ICurrentUserState } from ".";
import { userTypes } from "../actions/user.action";
import { loginTypes } from "../actions/login.action";

const initialState: ICurrentUserState = {
    groups: [],
    self: {}
}


export const CurrentUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case userTypes.Set_User_Groups:
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
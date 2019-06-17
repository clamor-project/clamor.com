import { ICurrentUserState } from ".";
import { userTypes } from "../actions/user.action";

const initialState: ICurrentUserState = {
    groups: []
}


export const CurrentUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case userTypes.Set_User_Groups:
            return {
                ...state,
                groups: action.payload
            }    
        default:
            return state
    }
}
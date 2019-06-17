import { ICurrentGroupState } from ".";
import { GroupTypes } from "../actions/group.action";

const initialState: ICurrentGroupState = {

}


export const CurrentGroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GroupTypes.Set_Group:
            return action.payload
    
        default:
            return state
    }
}
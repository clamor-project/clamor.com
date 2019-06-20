import { ISearchedGroupsState } from ".";
import { GroupTypes } from "../actions/group.action";

const initialState: ISearchedGroupsState = {
    groupList: []
}


export const SearchedGroupReducer = (state = initialState, action) => {

    switch (action.type) {
        case GroupTypes.Set_Groups:
            return {
                groupList: action.payload
            }
    
        default:
            return state
    }
}
// import { IUsergroupState } from ".";
import { USERGROUP_TYPES } from "../actions/usergroup.action";

// This is commented out because TS is being a whiney turd
// and not acting consistently and frankly I'm fed up dealing
// with its crap on this short a timeline
// const initialState: IUsergroupState = {
//   usergroupList: [],
//   currentUsergroup: null
// }

export const UsergroupReducer = (state, action) => {
  switch (action.type) {
    case USERGROUP_TYPES.SET_CURRENT_USERGROUPS:
      return {
        ...state,
        usergroupList: action.payload
      }

    case USERGROUP_TYPES.SET_CURRENTUSER_USERGROUP:
      return {
        ...state,
        currentUsergroup: action.payload
      }

    default:
      return {
        state
      }
  }
}
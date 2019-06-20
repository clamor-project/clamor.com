import { IFriendState } from ".";
import { loginTypes } from "../actions/login.action";

const initialState:IFriendState = {
  mutualFriends: [],
  friendRequests: []
}

export const FriendReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginTypes.Set_Mutual_Friends:
      return {
        ...state,
        mutualFriends: action.payload
      }
    case loginTypes.Set_Friend_Requests:
      return {
        ...state,
        friendRequests: action.payload
      }
    default:
      return state
  }
}

import { IGroupMessageState } from ".";
import { GROUP_MESSAGE_TYPES } from "../actions/group-message.action";

const initialState: IGroupMessageState = {
  messageList: []
}

export const GroupMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GROUP_MESSAGE_TYPES.SET_GROUP_MESSAGES:
      return {
        messageList: action.payload
      }

    default:
      return {state}
  }
}
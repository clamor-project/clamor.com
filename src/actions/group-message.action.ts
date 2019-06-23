import { apiClient } from "../axios/client";
import { IGroupMessage } from "../models/GroupMessage";

export const GROUP_MESSAGE_TYPES = {
  SET_GROUP_MESSAGES: 'SET_GROUP_MESSAGES'
}

export const getGroupMessagesByGroupId = (id: number) => async (dispatch) => {
  try {
    const response = await apiClient(`/group/messages/${id}`);
    if (response.status === 200) {
      dispatch({
        type: GROUP_MESSAGE_TYPES.SET_GROUP_MESSAGES,
        payload: response.data
      });
    }
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
  }
}

export const postGroupMessage = (groupMessage: IGroupMessage) => async (dispatch) => {
  try {
    const response = await apiClient.post(`/group/messages`, groupMessage);
    if (response.status === 200) {
      const newResponse = await apiClient(`/group/messages/${groupMessage.author.group.id}`);
      if (newResponse.status === 200) {
        dispatch({
          type: GROUP_MESSAGE_TYPES.SET_GROUP_MESSAGES,
          payload: newResponse.data
        });
      }
    }
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
  }
}

export const deleteGroupMessage = (messageId: number, groupId: number) => async (dispatch) => {
  try {
    const response = await apiClient.delete(`/group/messages/${messageId}`);
    if (response.status === 200) {
      const newResponse = await apiClient(`/group/messages/${groupId}`);
      if (newResponse.status === 200) {
        dispatch({
          type: GROUP_MESSAGE_TYPES.SET_GROUP_MESSAGES,
          payload: newResponse.data
        });
      }
    }
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
  }
}
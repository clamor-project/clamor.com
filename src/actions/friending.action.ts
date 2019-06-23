import { friendingClient } from "../axios/friending-client";
import { getInformation } from "./login.action";
import { IDirectmessage } from "../models/Directmessage";

export const FRIENDING_TYPES = {
  Set_Conversation: 'SET_CONVERSATION'
}

export const makeFriending = (userId: number, targetId: number) => async dispatch => {
  try {
    const response = await friendingClient.post('/add', {
      id: 0,
      user1: { id: userId },
      user2: { id: targetId }
    })
    if (response.status === 200) {
      getInformation(userId, dispatch)
    }
  } catch (error) {
    console.log(error)
  }
}

export const abandonFriending = (targetId: number, userId: number) => async dispatch => {
  try {
    const response = await friendingClient.delete('/delete', {
      data: {
        id: 0,
        user1: { id: userId },
        user2: { id: targetId }
      }
    })
    if (response.status === 200) {
      getInformation(userId, dispatch)
    }
  } catch (error) {
    console.log(error)
  }
} 

export const getMessage = (user1: number, user2: number) => async dispatch => {
  try {
    const response = await friendingClient.get('/conversation', {
      params: {
        id1: user1,
        id2: user2
      }
    })
    if(response.status === 200) {
      dispatch({
        type: FRIENDING_TYPES.Set_Conversation,
        payload: response.data
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const postMessage = (message: IDirectmessage) => async dispatch => {
  try {
    const response = await friendingClient.post('/conversation', message)
    if(response.status === 200) {
      getMessage(message.friends.user2.id, message.friends.user1.id)(dispatch)
    }
  } catch (error) {
    console.log(error)
  }
}

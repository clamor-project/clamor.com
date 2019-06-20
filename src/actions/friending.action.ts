import { friendingClient } from "../axios/friending-client";
import { getInformation } from "./login.action";

export const makeFriending = (userId: number, targetId: number) => async dispatch => {
  try {
    const response = await friendingClient.post('/add', {
      user_1: userId,
      user_2: targetId
    })
    if(response.status === 200) {
      getInformation(userId, dispatch)
    }
  } catch (error) {
    console.log(error)
  }
}

export const abandonFriending = (userId: number, targetId: number) => async dispatch => {
  try {
    const response = await friendingClient.delete('/delete', {
      data: {
        user_1: userId,
        user_2: userId
      }
    })
    if(response.status === 200) {
      getInformation(userId, dispatch)
    }
  } catch (error) {
    console.log(error)
  }
} 

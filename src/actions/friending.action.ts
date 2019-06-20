import { friendingClient } from "../axios/friending-client";
import { getInformation } from "./login.action";

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

export const abandonFriending = (userId: number, targetId: number) => async dispatch => {
  try {
    const response = await friendingClient.delete('/delete', {
      data: {
        id: 0,
        user1: { id: userId },
        user2: { id: userId }
      }
    })
    if (response.status === 200) {
      getInformation(userId, dispatch)
    }
  } catch (error) {
    console.log(error)
  }
} 

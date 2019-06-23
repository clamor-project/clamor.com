import { userClient } from "../axios/user-client";
import { IUser } from "../models/User";
import { friendingClient } from "../axios/friending-client";
import { loginTypes } from "./login.action";

export const userTypes ={
    Not_Found: 'USER_NOT_FOUND',
    Found_User: 'FOUND_USER',
    Set_User_Groups: 'SET_USER_GROUPS',
    Set_Friendables: 'SET_FRIENDABLES'
}

export const getUserGroups = (id:number) => async dispatch => {
    const response = await userClient.get('/groups/' + id)
    if(response.status === 200) {
        dispatch({
            type: userTypes.Set_User_Groups,
            payload: response.data
        })
    }
}

export const getUserById = (id:number) => async (dispatch) => {
    const response = await userClient.get('/id/' + id)
    if(response.status === 200) {
        dispatch({
            type: userTypes.Found_User,
            payload: response.data
        })
    }
}

export const updateProfile = (user:IUser) => async (dispatch) => {
    const response = await userClient.patch('/update', user)
    if(response.status === 200) {
        dispatch({
            type: userTypes.Found_User,
            payload: response.data
        })
    }

}

export const getFriendables = (id:number) => async dispatch => {
    try {
        const response = await userClient.get('friends/potendial/' + id)
        if(response.status === 200) {
            dispatch({
                type: userTypes.Set_Friendables,
                payload: response.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const findFriends = (id:number) => async dispatch =>{
    try {
        const response = await friendingClient.get('/friends/' + id)
        if(response.status === 200) {
            dispatch({
                type: loginTypes.Set_Mutual_Friends,
                payload: response.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}
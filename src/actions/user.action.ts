import { userClient } from "../axios/user-client";

export const userTypes ={
    Not_Found: 'USER_NOT_FOUND',
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

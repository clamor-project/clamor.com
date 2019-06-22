import { groupClient } from "../axios/group-client";
import { IUser } from "../models/User";
import { getInformation } from "./login.action";

export const GroupTypes = {
    Not_Found: 'GROUP_NOT_FOUND',
    Set_Groups: 'SET_GROUPS',
    Set_Group: 'SET_GROUP'
}

export const getGroupById = (id: number) => async dispatch => {
    try {
        const response = await groupClient.get(`id/${id}`)
        if (response.status === 200) {
            dispatch({
                type: GroupTypes.Set_Group,
                payload: response.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getAllGroups = () => async dispatch => {
    try {
        const response = await groupClient.get('');
        if(response.status === 200) {
            dispatch({
                type: GroupTypes.Set_Groups,
                payload: response.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const joinGroup = (user:IUser, groupId:number) => async dispatch => {
    try {
        const response = await groupClient.post('/join/' + groupId, user)
        if(response.status === 200) {
            getInformation(user.id, dispatch)
        }
    } catch (error) {
        console.log(error)
    }
}

export const leaveGroup = (user: IUser, groupId: number) => async (dispatch) => {
    try {
        const response = await groupClient.patch('/leave/' + groupId, user);
        if (response.status === 200) {
            getInformation(user.id, dispatch)
        }
    } catch (err) {
        console.log(`Something went wrong: ${err}`);
    }
}
import { loginClient } from '../axios/login-client'
import { userClient } from '../axios/user-client';
import { friendingClient } from '../axios/friending-client';

export const loginTypes = {
    New_User: 'NEW_USER_LOGGED_IN',
    Not_Found: 'USER_NOT_FOUND',
    Set_Current_User: 'SET_CURRENT_USER',
    Set_Mutual_Friends: 'SET_MUTUAL_FRIENDS',
    Set_Friend_Requests: 'SET_FRIEND_REQUESTS',
    Set_User_Groups: 'SET_USER_GROUPS'
}

export const getInformation = (id: number, dispatch: any) => {
    userClient.get('/groups/' + id).then(response => {
        dispatch({
            type: loginTypes.Set_User_Groups,
            payload: response.data
        })
    }).catch(error => {
        console.log(error);
    })
    friendingClient.get('/friends/' + id).then(response => {
        dispatch({
            type: loginTypes.Set_Mutual_Friends,
            payload: response.data
        })
    }).catch(error => {
        console.log(error);
    })
    friendingClient.get('/requests/' + id).then(response => {
        dispatch({
            type: loginTypes.Set_Friend_Requests,
            payload: response.data
        })
    }).catch(error => {
        console.log(error)
    })
    // note, using old school promises because we do not need to get this
    // information in order
}

export const sendLogin = (username: string, password: string, history: any) => async dispatch => {
    try {
        const response = await loginClient.post('', {
            username,
            password
        })
        if (response.status === 200 && response.data.id) {
            dispatch({
                type: loginTypes.Set_Current_User,
                payload: response.data
            })
            getInformation(response.data.id, dispatch)
            history.push('/groups')
        }
    } catch (error) {
        console.log(error)
    }
}

export const sendRegistration = (username: string, password: string, email: string, dateOfBirth: string, history: any) => async dispatch => {
    try {
        const response = await userClient.post('register', {
            dateOfBirth,
            email,
            password,
            username,
            id: 0
        })

        if (response.status === 200) {
            dispatch({
                type: loginTypes.Set_Current_User,
                payload: response.data
            })
            history.push('/browse')
        }
    } catch (error) {
        console.log(error);
    }
}

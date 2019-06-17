import { loginClient } from '../axios/login-client'

export const loginTypes ={
    New_User: 'NEW_USER_LOGGED_IN',
    Not_Found: 'USER_NOT_FOUND',
    Set_Current_User: 'SET_CURRENT_USER'
}

export const sendLogin = (username:string, password:string) => async dispatch => {
    try {
        const response = await loginClient.post('', {
            username,
            password
        })
        if(response.status === 200 && response.data.id) {
            dispatch({
                type: loginTypes.Set_Current_User,
                payload: response.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}
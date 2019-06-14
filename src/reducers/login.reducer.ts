import { ICurrentUserState } from ".";

const initialState: ICurrentUserState = {
    currentUser: {
        id: 0,
        username: 'Trying',
        password: 'Password',
        dob: '1997-10-03',
        email: 'TryingHard@Jims.com'
    }
}


export const CurrentUserReducer = (state = initialState, action) => {
    return state
}
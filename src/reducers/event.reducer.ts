import { IEventState } from ".";
import { EVENT_TYPES } from "../actions/event.action"

const initialState: IEventState = {
    eventList: [],
    currentEvent: {
        id: 0,
        creator: {
            group: {
                description: "",
                id: 0,
                name: "",
                private: false
            },
            id: 0,
            joinedDate: null,
            role: {
                id: 0,
                roleName: ""
            },
            user: {
                dateOfBirth: null,
                email: "",
                id: 0,
                password: "",
                username: ""
            }
        },
        dateOf: null,
        datePosted: null,
        title: "",
        description: "",
        groupId: {
            description: "",
            id: 0,
            name: "",
            private: false
        },
        live: false
    }
}

export const EventReducer = (state = initialState, action) => {
    switch (action.type) {
        case EVENT_TYPES.SET_CURRENT_EVENT:
            return {
                ...state,
                currentEvent: action.payload
            }
        
        case EVENT_TYPES.SET_GROUP_EVENTS:
            return {
                ...state,
                eventList: action.payload
            }

        default:
            return state
    }
}
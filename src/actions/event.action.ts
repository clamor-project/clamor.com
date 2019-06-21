import { eventClient } from "../axios/event-client";
import { groupClient } from "../axios/group-client";

export const EVENT_TYPES = {
    SET_GROUP_EVENTS: 'SET_GROUP_EVENTS',
    SET_CURRENT_EVENT: 'SET_CURRENT_EVENT'
}

export const getEventsByGroupId = (id: number) => async (dispatch) => {
    try {
        const response = await groupClient.get(`event/${id}`);
        if (response.status === 200) {
            dispatch({
                type: EVENT_TYPES.SET_GROUP_EVENTS,
                payload: response.data
            })
        }
    } catch (err) {
        console.log(`Something went wrong: ${err}`);
    }
}

export const getEventById = (id: number) => async (dispatch) => {
    try {
        const response = await eventClient.get(`id/${id}`);
        if (response.status === 200) {
            dispatch({
                type: EVENT_TYPES.SET_CURRENT_EVENT,
                payload: response.data
            })
        }
    } catch (err) {
        console.log(`Something went wrong: ${err}`);
    }
}
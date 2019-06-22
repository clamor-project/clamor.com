import { eventClient } from "../axios/event-client";
import { groupClient } from "../axios/group-client";
import { IEvent } from "../models/Event";

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

export const createEvent = (event: IEvent, groupId: number) => async (dispatch) => {
    try {
        const response = await eventClient.post(`event/${groupId}`, event);
        if (response.status === 200)
        console.log(response.data);
    } catch (err) {
        console.log(`Something went wrong: ${err}`);
    }
}
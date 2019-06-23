import { groupClient } from "../axios/group-client";
import { IEvent } from "../models/Event";
import { apiClient } from "../axios/client";

export const EVENT_TYPES = {
    SET_GROUP_EVENTS: 'SET_GROUP_EVENTS',
    SET_CURRENT_EVENT: 'SET_CURRENT_EVENT'
}

export const getEventsByGroupId = (id: number) => async (dispatch) => {
    try {
        const response = await apiClient.get(`group/event/${id}`);
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
        const response = await apiClient.get(`event/id/${id}`);
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
        const response = await groupClient.post(`event/${groupId}`, event);
        if (response.status === 200){
            const newResponse = await groupClient.get(`event/${groupId}`);
            if (newResponse.status === 200) {
                dispatch({
                    type: EVENT_TYPES.SET_GROUP_EVENTS,
                    payload: newResponse.data
                });
            }
        }
    } catch (err) {
        console.log(`Something went wrong: ${err}`);
    }
}

export const editEvent = (event: IEvent, userId: number) => async (dispatch) => {
    try {
        const response = await groupClient.patch(`event/${userId}`, event);
        if (response.status === 200) {
            const newResponse = await groupClient.get(`event/${event.creator.group.id}`);
            if (newResponse.status === 200) {
                dispatch({
                    type: EVENT_TYPES.SET_GROUP_EVENTS,
                    payload: newResponse.data
                });
            }
        }
    } catch (err) {
        console.log(`Something went wrong: ${err}`);
    }
}
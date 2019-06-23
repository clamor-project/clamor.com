import { apiClient } from "../axios/client";
import { IUsergroup } from "../models/Usergroup";

export const USERGROUP_TYPES = {
  SET_CURRENT_USERGROUPS: 'SET_USERGROUPS',
  SET_CURRENTUSER_USERGROUP: 'SET_CURRENTUSER_USERGROUP'
}

export const getUsergroupById = (id: number) => async (dispatch) => {
  try {
    const response = await apiClient(`/usergroup/id/${id}`);
    if (response.status === 200) {
      dispatch({
        type: USERGROUP_TYPES.SET_CURRENTUSER_USERGROUP,
        payload: response.data
      });
    }
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
  }
}

export const getUsergroupsByGroupId = (id: number) => async (dispatch) => {
  try {
    const response = await apiClient(`/group/members/id/${id}`);
    if (response.status === 200) {
      dispatch({
        type: USERGROUP_TYPES.SET_CURRENT_USERGROUPS,
        payload: response.data
      });
    }
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
  }
}

export const setUsergroupRole = (usergroup: IUsergroup, roleId: number) => async (dispatch) => {
  try {
    const response = await apiClient.patch(`/usergroup/role/${roleId}`, usergroup)
    if (response.status === 200) {
      const newResponse = await apiClient(`/group/members/id/${usergroup.group.id}`);
      if (newResponse.status === 200) {
        dispatch({
          type: USERGROUP_TYPES.SET_CURRENT_USERGROUPS,
          payload: newResponse.data
        });
      }
    }
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
  }
}
import { updateObject } from '../utils/updateObject';
import { PROFILE } from '../constants/Profile.constant';

const getProfileSuccessFul = (state, action) => {
    return updateObject(state, {
        profile: action.payload.data.role_user,
        dashboard: action.payload.data.dashboard,
        get_profile_status: action.payload.status,
        get_profile_message: action.payload.message,
    });
}
const getProfileUnsuccessFul = (state, action) => {
    return updateObject(state, {
        get_profile_status: action.payload.status,
        get_profile_message: action.payload.message,
    });
}


const profileUpdateSuccessFul = (state, action) => {
    return updateObject(state, {
        profile: action.payload.data,
        update_profile_status: action.payload.status,
    });
}
const profileUpdateUnsuccessFul = (state, action) => {
    return updateObject(state, {
        update_profile_status: action.payload.status,
    });
}


const profileResetUpdate = (state, action) => {
    return updateObject(state, {
        update_profile_status: null,
    });
}


const initialState = {
    profile: null,
    get_profile_status: null,
    get_profile_message: null,

    update_profile_status: null
};


const reducer = (state = initialState, action) => {
    const PROFILE_GET_SUCCESSFUL = PROFILE.GET_SUCCESSFUL;
    const PROFILE_GET_UNSUCCESSFUL = PROFILE.GET_UNSUCCESSFUL;

    const PROFILE_UPDATE_BASIC_PROFILE_SUCCESSFUL = PROFILE.UPDATE_BASIC_PROFILE_SUCCESSFUL;
    const PROFILE_UPDATE_BASIC_PROFILE_UNSUCCESSFUL = PROFILE.UPDATE_BASIC_PROFILE_UNSUCCESSFUL;

    const PROFILE_RESET_UPDATE = PROFILE.RESET_UPDATE;


    const lookup = {
        PROFILE_GET_SUCCESSFUL: getProfileSuccessFul,
        PROFILE_GET_UNSUCCESSFUL: getProfileUnsuccessFul,

        PROFILE_UPDATE_BASIC_PROFILE_SUCCESSFUL: profileUpdateSuccessFul,
        PROFILE_UPDATE_BASIC_PROFILE_UNSUCCESSFUL: profileUpdateUnsuccessFul,

        PROFILE_RESET_UPDATE: profileResetUpdate
    }
    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
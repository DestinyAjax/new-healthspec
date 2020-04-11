import { PROFILE } from '../constants/Profile.constant';


export const updateBasicProfile = payload => ({
    type: PROFILE.BASIC_PROFILE_UPDATE,
    payload
});
export const updateBasicProfileSuccessful = payload => ({
    type: PROFILE.UPDATE_BASIC_PROFILE_SUCCESSFUL,
    payload
});
export const updateBasicProfileUnsuccessful = payload => ({
    type: PROFILE.UPDATE_BASIC_PROFILE_UNSUCCESSFUL,
    payload
});



export const getProfileFor = payload => ({
    type: PROFILE.GET,
    payload
});
export const getProfileForSuccessful = payload => ({
    type: PROFILE.GET_SUCCESSFUL,
    payload
});
export const getProfileForUnsuccessful = payload => ({
    type: PROFILE.GET_UNSUCCESSFUL,
    payload
});




export const resetProfileUpdate = payload => ({
    type: PROFILE.RESET_UPDATE,
    payload
});
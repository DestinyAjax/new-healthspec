import { GUEST } from '../constants/Guest.constant';


export const getDefaultData = payload => ({
    type: GUEST.DEFAULT_DATA,
    payload
});
export const getDefaultDataSuccessful = payload => ({
    type: GUEST.DEFAULT_DATA_SUCCESSFUL,
    payload
});
export const getDefaultDataUnsuccessful = payload => ({
    type: GUEST.DEFAULT_DATA_UNSUCCESSFUL,
    payload
});


export const getServices = payload => ({
    type: GUEST.GET_SERVICES,
    payload
});
export const getServicesSuccessful = payload => ({
    type: GUEST.GET_SERVICES_SUCCESSFUL,
    payload
});
export const getServicesUnsuccessful = payload => ({
    type: GUEST.GET_SERVICES_UNSUCCESSFUL,
    payload
});
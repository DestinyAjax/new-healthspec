import { ENCOUNTER } from '../constants/Encounter.constant';


export const getQuery = payload => ({
    type: ENCOUNTER.GET_QUERY,
    payload
});
export const getQuerySuccessful = payload => ({
    type: ENCOUNTER.GET_QUERY_SUCCESSFUL,
    payload
});
export const getQueryUnsuccessful = payload => ({
    type: ENCOUNTER.GET_QUERY_UNSUCCESSFUL,
    payload
});



export const resetGetQuery = payload => ({
    type: ENCOUNTER.RESET_GET_QUERY,
    payload
});



export const storeEncounter = payload => ({
    type: ENCOUNTER.STORE,
    payload
});
export const storeEncounterSuccessful = payload => ({
    type: ENCOUNTER.STORE_SUCCESSFUL,
    payload
});
export const storeEncounterUnsuccessful = payload => ({
    type: ENCOUNTER.STORE_UNSUCCESSFUL,
    payload
});



export const resetStoreEncounter = payload => ({
    type: ENCOUNTER.STORE_RESET,
    payload
});



export const getAllFor = payload => ({
    type: ENCOUNTER.GET_ALL_FOR,
    payload
});
export const getAllForSuccessful = payload => ({
    type: ENCOUNTER.GET_ALL_FOR_SUCCESSFUL,
    payload
});
export const getAllForUnsuccessful = payload => ({
    type: ENCOUNTER.GET_ALL_FOR_UNSUCCESSFUL,
    payload
});

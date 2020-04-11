import { REFER } from '../constants/Refer.constant';


export const getQuery = payload => ({
    type: REFER.GET_QUERY,
    payload
});
export const getQuerySuccessful = payload => ({
    type: REFER.GET_QUERY_SUCCESSFUL,
    payload
});
export const getQueryUnsuccessful = payload => ({
    type: REFER.GET_QUERY_UNSUCCESSFUL,
    payload
});

export const getRefer = payload => ({
    type: REFER.GET,
    payload
});
export const getReferSuccessful = payload => ({
    type: REFER.GET_SUCCESSFUL,
    payload
});
export const getReferUnsuccessful = payload => ({
    type: REFER.GET_UNSUCCESSFUL,
    payload
});



export const resetGetQuery = payload => ({
    type: REFER.RESET_GET_QUERY,
    payload
});



export const storeRefer = payload => ({
    type: REFER.STORE,
    payload
});
export const storeReferSuccessful = payload => ({
    type: REFER.STORE_SUCCESSFUL,
    payload
});
export const storeReferUnsuccessful = payload => ({
    type: REFER.STORE_UNSUCCESSFUL,
    payload
});



export const resetStore = payload => ({
    type: REFER.STORE_RESET,
    payload
});



export const updateRefer = payload => ({
    type: REFER.UPDATE,
    payload
});
export const updateReferSuccessful = payload => ({
    type: REFER.UPDATE_SUCCESSFUL,
    payload
});
export const updateReferUnsuccessful = payload => ({
    type: REFER.UPDATE_UNSUCCESSFUL,
    payload
});

export const updateReferClaims = payload => ({
    type: REFER.UPDATE_CLAIMS,
    payload
});
export const updateReferClaimsSuccessful = payload => ({
    type: REFER.UPDATE_CLAIMS_SUCCESSFUL,
    payload
});
export const updateReferClaimsUnsuccessful = payload => ({
    type: REFER.UPDATE_CLAIMS_UNSUCCESSFUL,
    payload
});

export const getReferService = payload => ({
    type: REFER.GET_SERVICE,
    payload
});
export const getReferServiceSuccessful = payload => ({
    type: REFER.GET_SERVICE_SUCCESSFUL,
    payload
});
export const getReferServiceUnsuccessful = payload => ({
    type: REFER.GET_SERVICE_UNSUCCESSFUL,
    payload
});

import { ENROLLEE } from "../constants/Enrollee.constant";

export const getEnrolless = payload => ({
    type: ENROLLEE.GET_ALL,
    payload
});
export const getBeneficiariesSuccessful = payload => ({
    type: ENROLLEE.GET_ALL_SUCCESSFUL,
    payload
});
export const getBeneficiariesUnsuccessful = payload => ({
    type: ENROLLEE.GET_ALL_UNSUCCESSFUL,
    payload
});

export const getEnrollee = payload => ({
    type: ENROLLEE.GET,
    payload
});
export const getEnrolleeSuccessful = payload => ({
    type: ENROLLEE.GET_SUCCESSFUL,
    payload
});
export const getEnrolleeUnsuccessful = payload => ({
    type: ENROLLEE.GET_UNSUCCESSFUL,
    payload
});

export const resetStoreEnrollee = payload => ({
    type: ENROLLEE.RESET_STORE,
    payload
});

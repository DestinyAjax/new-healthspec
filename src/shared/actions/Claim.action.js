import { CLAIM } from '../constants/Claim.constant';



export const getAllClaims = payload => ({
    type: CLAIM.GET_ALL,
    payload
});
export const getAllClaimsSuccessful = payload => ({
    type: CLAIM.GET_ALL_SUCCESSFUL,
    payload
});
export const getAllClaimsUnsuccessful = payload => ({
    type: CLAIM.GET_ALL_UNSUCCESSFUL,
    payload
});



export const getClaim = payload => ({
    type: CLAIM.GET,
    payload
});
export const getClaimSuccessful = payload => ({
    type: CLAIM.GET_SUCCESSFUL,
    payload
});
export const getClaimUnsuccessful = payload => ({
    type: CLAIM.GET_UNSUCCESSFUL,
    payload
});



export const confirmClaim = payload => ({
    type: CLAIM.CONFIRM,
    payload
});
export const confirmClaimSuccessful = payload => ({
    type: CLAIM.CONFIRM_SUCCESSFUL,
    payload
});
export const confirmClaimUnsuccessful = payload => ({
    type: CLAIM.CONFIRM_UNSUCCESSFUL,
    payload
});



export const resetClaimConfirm = payload => ({
    type: CLAIM.RESET_CONFIRM,
    payload
});



export const updateClaimEncounterService = payload => ({
    type: CLAIM.UPDATE_ENCOUNTER_SERVICE,
    payload
});
export const updateClaimEncounterServiceSuccessful = payload => ({
    type: CLAIM.UPDATE_ENCOUNTER_SERVICE_SUCCESSFUL,
    payload
});
export const updateClaimEncounterServiceUnsuccessful = payload => ({
    type: CLAIM.UPDATE_ENCOUNTER_SERVICE_UNSUCCESSFUL,
    payload
});



export const resetUpdateClaimEncounterService = payload => ({
    type: CLAIM.RESET_UPDATE_ENCOUNTER_SERVICE,
    payload
});

import { TREATMENT_CASE } from "../constants/TreatmentCase.constant";

export const storeTreatment = payload => ({
    type: TREATMENT_CASE.STORE,
    payload
});
export const storeTreatmentSuccessful = payload => ({
    type: TREATMENT_CASE.SUCCESSFUL,
    payload
});
export const storeTreatmentUnsuccessful = payload => ({
    type: TREATMENT_CASE.UNSUCCESSFUL,
    payload
});

export const resetStoreTreatment = payload => ({
    type: TREATMENT_CASE.RESET_STORE,
    payload
});

export const getAll = payload => ({
    type: TREATMENT_CASE.GET_ALL,
    payload
});
export const getAllSuccessful = payload => ({
    type: TREATMENT_CASE.GET_ALL_SUCCESSFUL,
    payload
});
export const getAllUnsuccessful = payload => ({
    type: TREATMENT_CASE.GET_ALL_UNSUCCESSFUL,
    payload
});

export const deleteTreatment = payload => ({
    type: TREATMENT_CASE.DELETE,
    payload
});
export const deleteTreatmentSuccessful = payload => ({
    type: TREATMENT_CASE.DELETE_SUCCESSFUL,
    payload
});
export const deleteTreatmentUnsuccessful = payload => ({
    type: TREATMENT_CASE.DELETE_UNSUCCESSFUL,
    payload
});

export const getTreatment = payload => ({
    type: TREATMENT_CASE.GET,
    payload
});
export const getTreatmentSuccessful = payload => ({
    type: TREATMENT_CASE.GET_SUCCESSFUL,
    payload
});
export const getTreatmentUnsuccessful = payload => ({
    type: TREATMENT_CASE.GET_UNSUCCESSFUL,
    payload
});

export const updateTreatment = payload => ({
    type: TREATMENT_CASE.UPDATE,
    payload
});
export const updateTreatmentSuccessful = payload => ({
    type: TREATMENT_CASE.UPDATE_SUCCESSFUL,
    payload
});
export const updateTreatmentUnsuccessful = payload => ({
    type: TREATMENT_CASE.UPDATE_UNSUCCESSFUL,
    payload
});

export const resetUpdateTreatment = payload => ({
    type: TREATMENT_CASE.RESET_UPDATE,
    payload
});

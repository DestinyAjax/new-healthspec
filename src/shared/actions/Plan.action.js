import { PLAN } from "../constants/Plan.constant";

export const storePlan = payload => ({
    type: PLAN.STORE,
    payload
});
export const storePlanSuccessful = payload => ({
    type: PLAN.SUCCESSFUL,
    payload
});
export const storePlanUnsuccessful = payload => ({
    type: PLAN.UNSUCCESSFUL,
    payload
});

export const resetStorePlan = payload => ({
    type: PLAN.RESET_STORE,
    payload
});

export const resetUpdatePlan = payload => ({
    type: PLAN.RESET_UPDATE,
    payload
});

export const resetGetPlan = payload => ({
    type: PLAN.RESET_GET,
    payload
});

export const getPlans = payload => ({
    type: PLAN.GET_ALL,
    payload
});
export const getPlansSuccessful = payload => ({
    type: PLAN.GET_ALL_SUCCESSFUL,
    payload
});
export const getPlansUnsuccessful = payload => ({
    type: PLAN.GET_ALL_UNSUCCESSFUL,
    payload
});

export const deletePlan = payload => ({
    type: PLAN.DELETE,
    payload
});
export const deletePlanSuccessful = payload => ({
    type: PLAN.DELETE_SUCCESSFUL,
    payload
});
export const deletePlanUnsuccessful = payload => ({
    type: PLAN.DELETE_UNSUCCESSFUL,
    payload
});

export const getPlan = payload => ({
    type: PLAN.GET,
    payload
});
export const getPlanSuccessful = payload => ({
    type: PLAN.GET_SUCCESSFUL,
    payload
});
export const getPlanUnsuccessful = payload => ({
    type: PLAN.GET_UNSUCCESSFUL,
    payload
});

export const updatePlan = payload => ({
    type: PLAN.UPDATE,
    payload
});
export const updatePlanSuccessful = payload => ({
    type: PLAN.UPDATE_SUCCESSFUL,
    payload
});
export const updatePlanUnsuccessful = payload => ({
    type: PLAN.UPDATE_UNSUCCESSFUL,
    payload
});

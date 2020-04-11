import { PLAN_SERVICE } from '../constants/PlanService.constant';



export const storeBatchPlanService = payload => ({
    type: PLAN_SERVICE.STORE_BATCH,
    payload
});
export const storeBatchPlanServiceSuccessful = payload => ({
    type: PLAN_SERVICE.STORE_BATCH_SUCCESSFUL,
    payload
});
export const storeBatchPlanServiceUnsuccessful = payload => ({
    type: PLAN_SERVICE.STORE_BATCH_UNSUCCESSFUL,
    payload
});



export const storePlanService = payload => ({
    type: PLAN_SERVICE.STORE,
    payload
});
export const storePlanServiceSuccessful = payload => ({
    type: PLAN_SERVICE.STORE_SUCCESSFUL,
    payload
});
export const storePlanServiceUnsuccessful = payload => ({
    type: PLAN_SERVICE.STORE_UNSUCCESSFUL,
    payload
});



export const resetStorePlanService = payload => ({
    type: PLAN_SERVICE.RESET_STORE,
    payload
});


export const resetPlanServicesStatus = payload => ({
    type: PLAN_SERVICE.RESET_STATUS,
    payload
})



export const getAll = payload => ({
    type: PLAN_SERVICE.GET_ALL,
    payload
});
export const getAllSuccessful = payload => ({
    type: PLAN_SERVICE.GET_ALL_SUCCESSFUL,
    payload
});
export const getAllUnsuccessful = payload => ({
    type: PLAN_SERVICE.GET_ALL_UNSUCCESSFUL,
    payload
});



export const deletePlanService = payload => ({
    type: PLAN_SERVICE.DELETE,
    payload
});
export const deletePlanServiceSuccessful = payload => ({
    type: PLAN_SERVICE.DELETE_SUCCESSFUL,
    payload
});
export const deletePlanServiceUnsuccessful = payload => ({
    type: PLAN_SERVICE.DELETE_UNSUCCESSFUL,
    payload
});



export const getPlanService = payload => ({
    type: PLAN_SERVICE.GET,
    payload
});
export const getPlanServiceSuccessful = payload => ({
    type: PLAN_SERVICE.GET_SUCCESSFUL,
    payload
});
export const getPlanServiceUnsuccessful = payload => ({
    type: PLAN_SERVICE.GET_UNSUCCESSFUL,
    payload
});



export const updatePlanService = payload => ({
    type: PLAN_SERVICE.UPDATE,
    payload
});
export const updatePlanServiceSuccessful = payload => ({
    type: PLAN_SERVICE.UPDATE_SUCCESSFUL,
    payload
});
export const updatePlanServiceUnsuccessful = payload => ({
    type: PLAN_SERVICE.UPDATE_UNSUCCESSFUL,
    payload
});



export const resetUpdatePlanService = payload => ({
    type: PLAN_SERVICE.RESET_UPDATE,
    payload
});



export const resetGetPlanServices = payload => ({
    type: PLAN_SERVICE.RESET_GET,
    payload
});


export const getDependencies = payload => ({
    type: PLAN_SERVICE.GET_DEPENDENCY,
    payload
});
export const getDependenciesSuccessful = payload => ({
    type: PLAN_SERVICE.GET_DEPENDENCY_SUCCESSFUL,
    payload
});
export const getDependenciesUnsuccessful = payload => ({
    type: PLAN_SERVICE.GET_DEPENDENCY_UNSUCCESSFUL,
    payload
});




export const resetGetPlanService = payload => ({
    type: PLAN_SERVICE.RESET_GET,
    payload
});

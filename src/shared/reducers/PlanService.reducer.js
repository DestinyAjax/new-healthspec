import { updateObject } from '../utils/updateObject';
import { PLAN_SERVICE } from '../constants/PlanService.constant';

const serviceStoreBatch = (state, action) => {
    return updateObject(state, {
        store_batch_plan_service_status: action.payload.status,
        store_batch_plan_service_message: action.payload.message,
    });
}

const serviceStore = (state, action) => {
    return updateObject(state, {
        plan_service: action.payload.data,
        store_plan_service_status: action.payload.status,
        store_plan_service_message: action.payload.message,
    });
}

const planServiceStoreReset = (state, action) => {
    return updateObject(state, {
        delete_plan_service_status: null,
        store_plan_service_status: null,
        store_batch_plan_service_status: null,
    });
}


const planServiceGetReset = (state, action) => {
    return updateObject(state, {
        get_plan_service_status: null,
    });
}


const planServiceResetStatus = (state, action) => {
    return updateObject(state, {
        store_plan_service_status: null,
        delete_plan_service_status: null,
    });
}



const planServiceGetAllSuccessful = (state, action) => {
    return updateObject(state, {
        meta: action.payload.meta,
        plan_services: action.payload.data,
        get_plan_services_status: action.payload.status,
        get_plan_services_message: action.payload.message,
    });
}
const planServiceGetAllUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_plan_services_status: action.payload.status,
        get_plan_services_message: action.payload.message,
    });
}


const planServiceDeleteSuccessful = (state, action) => {
    return {
        ...state,
        delete_plan_service_status: 200,
        plan_services: [...state.plan_services].filter(plan_service => {
            return plan_service.id !== action.payload.plan_service_id
        })
    }
}
const planServiceDeleteUnsuccessful = (state, action) => {
    return {
        ...state
    }
}


const getPlanServiceSuccessful = (state, action) => {
    return updateObject(state, {
        plan_service: action.payload.data,
        get_plan_service_status: action.payload.status,
        // plan_service_questions: action.payload.data.questions,
    });
}
const getPlanServiceUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_plan_service_status: action.payload.status,
        get_plan_service_message: action.payload.message,
    });
}


const planServiceUpdateSuccessFul = (state, action) => {
    return updateObject(state, {
        plan_service: action.payload.data,
        update_plan_service_status: action.payload.status,
    });
}
const planServiceUpdateUnSuccessFul = (state, action) => {
    return updateObject(state, {
        update_plan_service_status: action.payload.status,
    });
}


const planServiceUpdateReset = (state, action) => {
    return updateObject(state, {
        update_plan_service_status: null,
    });
}


const planServiceDependencyWasSuccessful = (state, action) => {
    return updateObject(state, {
        plans: action.payload.data.plans,
        services: action.payload.data.services,
        questions: action.payload.data.questions,

        dependency_status: action.payload.status,
    });
}
const planServiceDependencyWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        update_plan_service_status: action.payload.status,
    });
}


const initialState = {
    plan_service: null,
    get_plan_service_status: null,

    store_batch_plan_service_status: null,
    store_batch_plan_service_message: null,

    store_plan_service_status: null,
    store_plan_service_message: null,

    meta: null,
    plan_services: [],
    get_plan_services_status: null,
    get_plan_services_message: null,

    delete_plan_service_status: null,
    update_plan_service_status: null,

    plans: [],
    services: [],
    questions: [],
    dependency_status: null,

    plan_service_questions: []
};


const reducer = (state = initialState, action) => {

    const PLAN_SERVICE_STORE_BATCH_SUCCESSFUL = PLAN_SERVICE.STORE_BATCH_SUCCESSFUL;
    const PLAN_SERVICE_STORE_BATCH_UNSUCCESSFUL = PLAN_SERVICE.STORE_BATCH_UNSUCCESSFUL;

    const PLAN_SERVICE_STORE_SUCCESSFUL = PLAN_SERVICE.STORE_SUCCESSFUL;
    const PLAN_SERVICE_STORE_UNSUCCESSFUL = PLAN_SERVICE.STORE_UNSUCCESSFUL;

    const PLAN_SERVICE_RESET_STORE = PLAN_SERVICE.RESET_STORE;

    const PLAN_SERVICE_GET_ALL_SUCCESSFUL = PLAN_SERVICE.GET_ALL_SUCCESSFUL;
    const PLAN_SERVICE_GET_ALL_UNSUCCESSFUL = PLAN_SERVICE.GET_ALL_UNSUCCESSFUL;

    const PLAN_SERVICE_DELETE_SUCCESSFUL = PLAN_SERVICE.DELETE_SUCCESSFUL;
    const PLAN_SERVICE_DELETE_UNSUCCESSFUL = PLAN_SERVICE.DELETE_UNSUCCESSFUL;

    const PLAN_SERVICE_RESET_STATUS = PLAN_SERVICE.RESET_STATUS

    const PLAN_SERVICE_GET_SUCCESSFUL = PLAN_SERVICE.GET_SUCCESSFUL;
    const PLAN_SERVICE_GET_UNSUCCESSFUL = PLAN_SERVICE.GET_UNSUCCESSFUL;

    const PLAN_SERVICE_UPDATE_SUCCESSFUL = PLAN_SERVICE.UPDATE_SUCCESSFUL;
    const PLAN_SERVICE_UPDATE_UNSUCCESSFUL = PLAN_SERVICE.UPDATE_UNSUCCESSFUL;

    const PLAN_SERVICE_RESET_UPDATE = PLAN_SERVICE.RESET_UPDATE;

    const PLAN_SERVICE_GET_DEPENDENCY_SUCCESSFUL = PLAN_SERVICE.GET_DEPENDENCY_SUCCESSFUL;
    const PLAN_SERVICE_GET_DEPENDENCY_UNSUCCESSFUL = PLAN_SERVICE.GET_DEPENDENCY_UNSUCCESSFUL;

    const lookup = {
        PLAN_SERVICE_STORE_BATCH_SUCCESSFUL: serviceStoreBatch,
        PLAN_SERVICE_STORE_BATCH_UNSUCCESSFUL: serviceStoreBatch,

        PLAN_SERVICE_STORE_SUCCESSFUL: serviceStore,
        PLAN_SERVICE_STORE_UNSUCCESSFUL: serviceStore,

        PLAN_SERVICE_RESET_STORE: planServiceStoreReset,
        PLAN_SERVICE_RESET_GET: planServiceGetReset,

        PLAN_SERVICE_GET_ALL_SUCCESSFUL: planServiceGetAllSuccessful,
        PLAN_SERVICE_GET_ALL_UNSUCCESSFUL: planServiceGetAllUnsuccessful,

        PLAN_SERVICE_DELETE_SUCCESSFUL: planServiceDeleteSuccessful,
        PLAN_SERVICE_DELETE_UNSUCCESSFUL: planServiceDeleteUnsuccessful,

        PLAN_SERVICE_RESET_STATUS: planServiceResetStatus,

        PLAN_SERVICE_GET_SUCCESSFUL: getPlanServiceSuccessful,
        PLAN_SERVICE_GET_UNSUCCESSFUL: getPlanServiceUnsuccessful,

        PLAN_SERVICE_UPDATE_SUCCESSFUL: planServiceUpdateSuccessFul,
        PLAN_SERVICE_UPDATE_UNSUCCESSFUL: planServiceUpdateUnSuccessFul,

        PLAN_SERVICE_RESET_UPDATE: planServiceUpdateReset,

        PLAN_SERVICE_GET_DEPENDENCY_SUCCESSFUL: planServiceDependencyWasSuccessful,
        PLAN_SERVICE_GET_DEPENDENCY_UNSUCCESSFUL: planServiceDependencyWasUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
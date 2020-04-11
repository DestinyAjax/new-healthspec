import { PLAN } from "../constants/Plan.constant";
import { updateObject } from "../utils/updateObject";

const planStoreSuccessFul = (state, action) => {
    return updateObject(state, {
        plan: action.payload.data,
        store_plan_status: action.payload.status,
        store_plan_message: action.payload.message
    });
};
const planStoreUnSuccessFul = (state, action) => {
    return updateObject(state, {
        store_plan_status: action.payload.status,
        store_plan_message: action.payload.message
    });
};

const planStoreReset = (state, action) => {
    return updateObject(state, {
        get_plan_status: null,
        store_plan_status: null,
        store_plan_message: null,
        delete_plan_status: null
    });
};

const planGetReset = (state, action) => {
    return updateObject(state, {
        plan: null,
        get_plan_status: null,
        get_plan_message: null
    });
};

const getAllPlansSuccessful = (state, action) => {
    return updateObject(state, {
        plans: action.payload.data,
        meta: action.payload.meta,
        get_plans_status: action.payload.status,
        get_plans_message: action.payload.message
    });
};
const getAllPlansUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_plans_status: action.payload.status,
        get_plans_message: action.payload.message
    });
};

const planDeleteSuccessful = (state, action) => {
    return {
        ...state,
        delete_plan_status: 200,
        plans: [...state.plans].filter(plan => {
            return plan.slug !== action.payload.slug;
        })
    };
};
const planDeleteUnsuccessful = (state, action) => {
    return {
        ...state
    };
};

const getPlanSuccessful = (state, action) => {
    return updateObject(state, {
        plan: action.payload.data,
        get_plan_status: action.payload.status,
        get_plan_message: action.payload.message
    });
};
const getPlanUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_plan_status: action.payload.status,
        get_plan_message: action.payload.message
    });
};

const planUpdateSuccessFul = (state, action) => {
    return updateObject(state, {
        plan: action.payload.data,
        update_plan_status: action.payload.status,
        update_plan_message: action.payload.message
    });
};
const planUpdateUnSuccessFul = (state, action) => {
    return updateObject(state, {
        update_plan_status: action.payload.status,
        update_plan_message: action.payload.message
    });
};

const planUpdateReset = (state, action) => {
    return updateObject(state, {
        update_plan_status: null
    });
};

const initialState = {
    plan: null,

    store_plan_status: null,
    store_plan_message: null,

    plans: null,
    meta: null,

    get_plans_status: null,
    get_plans_message: null,

    delete_plan_status: null,

    get_plan_status: null,
    get_plan_message: null,

    update_plan_status: null,
    update_plan_message: null
};

const reducer = (state = initialState, action) => {
    const PLAN_SUCCESSFUL = PLAN.SUCCESSFUL;
    const PLAN_UNSUCCESSFUL = PLAN.UNSUCCESSFUL;
    const PLAN_RESET_STORE = PLAN.RESET_STORE;

    const PLAN_GET_ALL_SUCCESSFUL = PLAN.GET_ALL_SUCCESSFUL;
    const PLAN_GET_ALL_UNSUCCESSFUL = PLAN.GET_ALL_UNSUCCESSFUL;

    const PLAN_GET_SUCCESSFUL = PLAN.GET_SUCCESSFUL;
    const PLAN_GET_UNSUCCESSFUL = PLAN.GET_UNSUCCESSFUL;

    const PLAN_DELETE_SUCCESSFUL = PLAN.DELETE_SUCCESSFUL;
    const PLAN_DELETE_UNSUCCESSFUL = PLAN.DELETE_UNSUCCESSFUL;

    const PLAN_UPDATE_SUCCESSFUL = PLAN.UPDATE_SUCCESSFUL;
    const PLAN_UPDATE_UNSUCCESSFUL = PLAN.UPDATE_UNSUCCESSFUL;

    const PLAN_RESET_UPDATE = PLAN.RESET_UPDATE;

    const lookup = {
        PLAN_SUCCESSFUL: planStoreSuccessFul,
        PLAN_UNSUCCESSFUL: planStoreUnSuccessFul,

        PLAN_RESET_STORE: planStoreReset,

        PLAN_GET_ALL_SUCCESSFUL: getAllPlansSuccessful,
        PLAN_GET_ALL_UNSUCCESSFUL: getAllPlansUnsuccessful,

        PLAN_DELETE_SUCCESSFUL: planDeleteSuccessful,
        PLAN_DELETE_UNSUCCESSFUL: planDeleteUnsuccessful,

        PLAN_GET_SUCCESSFUL: getPlanSuccessful,
        PLAN_GET_UNSUCCESSFUL: getPlanUnsuccessful,

        PLAN_UPDATE_SUCCESSFUL: planUpdateSuccessFul,
        PLAN_UPDATE_UNSUCCESSFUL: planUpdateUnSuccessFul,

        PLAN_RESET_UPDATE: planUpdateReset,
        [PLAN.RESET_GET]: planGetReset
    };
    return lookup[action.type] ? lookup[action.type](state, action) : state;
};

export default reducer;

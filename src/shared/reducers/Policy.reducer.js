import { updateObject } from "../utils/updateObject";
import { POLICY } from "../constants/Policy.constant";

const policyStoreSuccessFul = (state, action) => {
    return updateObject(state, {
        policy: action.payload.data,
        store_policy_status: action.payload.status,
        store_policy_message: action.payload.message
    });
};
const policyStoreUnSuccessFul = (state, action) => {
    return updateObject(state, {
        store_policy_status: action.payload.status,
        store_policy_message: action.payload.message
    });
};

const policyStoreReset = (state, action) => {
    return updateObject(state, {
        store_policy_status: null,
        store_policy_message: null,
        delete_policy_status: null
    });
};

const policyGetAllSuccessful = (state, action) => {
    return updateObject(state, {
        meta: action.payload.meta,
        policies: action.payload.data,
        get_policies_status: action.payload.status,
        get_policies_message: action.payload.message
    });
};
const policyGetAllUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_policies_status: action.payload.status,
        get_policies_message: action.payload.message
    });
};

const policyGetBeneficiariesSuccessful = (state, action) => {
    return updateObject(state, {
        meta: action.payload.meta,
        policy_beneficiaries: action.payload.data,
        get_policy_beneficiaries_status: action.payload.status,
        get_policy_beneficiaries_message: action.payload.message
    });
};
const policyGetBeneficiariesUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_policy_beneficiaries_status: action.payload.status,
        get_policy_beneficiaries_message: action.payload.message
    });
};

const policyBeneficiariesReset = (state, action) => {
    return updateObject(state, {
        policy_beneficiaries: null,
        get_policy_beneficiaries_status: null,
        get_policy_beneficiaries_message: null
    });
};

const policyDeleteSuccessful = (state, action) => {
    return {
        ...state,
        delete_policy_status: 200,
        policies: [...state.policies].filter(policy => {
            return policy.slug !== action.payload.slug;
        })
    };
};
const policyDeleteUnsuccessful = (state, action) => {
    return {
        ...state
    };
};

const getPolicySuccessful = (state, action) => {
    return updateObject(state, {
        policy: action.payload.data,
        get_policy_status: action.payload.status,
        get_policy_message: action.payload.message
    });
};
const getPolicyUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_policy_status: action.payload.status,
        get_policy_message: action.payload.message
    });
};

const getPolicyReset = (state, action) => {
    return updateObject(state, {
        policy: null,
        get_policy_status: null,
        get_policy_message: null
    });
};

const policyUpdateSuccessFul = (state, action) => {
    return updateObject(state, {
        policy: action.payload.data,
        update_policy_status: action.payload.status,
        update_policy_message: action.payload.message
    });
};
const policyUpdateUnSuccessFul = (state, action) => {
    return updateObject(state, {
        update_policy_status: action.payload.status,
        update_policy_message: action.payload.message
    });
};

const policyUpdateReset = (state, action) => {
    return updateObject(state, {
        update_policy_status: null,
        get_policy_status: null
    });
};

const policyCreateDependencySuccessFul = (state, action) => {
    return updateObject(state, {
        dependency_plans: action.payload.data.plans,
        get_dependency_status: action.payload.status,
        dependency_organization_profiles: action.payload.data.organization_profiles
    });
};
const policyCreateDependencyUnSuccessFul = (state, action) => {
    return updateObject(state, {
        get_dependency_status: action.payload.status
    });
};

const initialState = {
    policy: null,
    store_policy_status: null,
    store_policy_message: null,

    meta: null,
    policies: [],

    get_policies_status: null,
    get_policies_message: null,

    delete_policy_status: null,

    get_policy_status: null,
    get_policy_message: null,

    update_policy_status: null,
    update_policy_message: null,

    get_dependency_status: null,
    dependency_plans: null,
    dependency_organization_profiles: null
};

const reducer = (state = initialState, action) => {
    const POLICY_SUCCESSFUL = POLICY.SUCCESSFUL;
    const POLICY_UNSUCCESSFUL = POLICY.UNSUCCESSFUL;
    const POLICY_RESET_STORE = POLICY.RESET_STORE;

    const POLICY_GET_ALL_SUCCESSFUL = POLICY.GET_ALL_SUCCESSFUL;
    const POLICY_GET_ALL_UNSUCCESSFUL = POLICY.GET_ALL_UNSUCCESSFUL;

    const POLICY_DELETE_SUCCESSFUL = POLICY.DELETE_SUCCESSFUL;
    const POLICY_DELETE_UNSUCCESSFUL = POLICY.DELETE_UNSUCCESSFUL;

    const POLICY_GET_SUCCESSFUL = POLICY.GET_SUCCESSFUL;
    const POLICY_GET_UNSUCCESSFUL = POLICY.GET_UNSUCCESSFUL;

    const POLICY_UPDATE_SUCCESSFUL = POLICY.UPDATE_SUCCESSFUL;
    const POLICY_UPDATE_UNSUCCESSFUL = POLICY.UPDATE_UNSUCCESSFUL;

    const POLICY_RESET_UPDATE = POLICY.RESET_UPDATE;

    const POLICY_CREATE_DEPENDENCY_SUCCESSFUL = POLICY.CREATE_DEPENDENCY_SUCCESSFUL;
    const POLICY_CREATE_DEPENDENCY_UNSUCCESSFUL = POLICY.CREATE_DEPENDENCY_UNSUCCESSFUL;

    const lookup = {
        POLICY_SUCCESSFUL: policyStoreSuccessFul,
        POLICY_UNSUCCESSFUL: policyStoreUnSuccessFul,
        POLICY_RESET_STORE: policyStoreReset,

        POLICY_GET_ALL_SUCCESSFUL: policyGetAllSuccessful,
        POLICY_GET_ALL_UNSUCCESSFUL: policyGetAllUnsuccessful,

        POLICY_DELETE_SUCCESSFUL: policyDeleteSuccessful,
        POLICY_DELETE_UNSUCCESSFUL: policyDeleteUnsuccessful,

        POLICY_GET_SUCCESSFUL: getPolicySuccessful,
        POLICY_GET_UNSUCCESSFUL: getPolicyUnsuccessful,

        [POLICY.GET_BENEFICIARIES_SUCCESSFUL]: policyGetBeneficiariesSuccessful,
        [POLICY.GET_BENEFICIARIES_UNSUCCESSFUL]: policyGetBeneficiariesUnsuccessful,
        [POLICY.GET_BENEFICIARIES_UNSUCCESSFUL]: policyGetBeneficiariesUnsuccessful,
        [POLICY.GET_BENEFICIARIES_RESET]: getPolicyReset,

        POLICY_UPDATE_SUCCESSFUL: policyUpdateSuccessFul,
        POLICY_UPDATE_UNSUCCESSFUL: policyUpdateUnSuccessFul,

        POLICY_CREATE_DEPENDENCY_SUCCESSFUL: policyCreateDependencySuccessFul,
        POLICY_CREATE_DEPENDENCY_UNSUCCESSFUL: policyCreateDependencyUnSuccessFul,

        POLICY_RESET_UPDATE: policyUpdateReset
    };
    return lookup[action.type] ? lookup[action.type](state, action) : state;
};

export default reducer;

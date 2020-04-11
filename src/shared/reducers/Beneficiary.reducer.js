import { updateObject } from '../utils/updateObject';
import { BENEFICIARY } from '../constants/Beneficiary.constant';

const beneficiaryStoreSuccessFul = (state, action) => {
    return updateObject(state, {
        beneficiary: action.payload.data.role_user,
        transaction: action.payload.data.transaction,
        store_beneficiary_status: action.payload.status,
        store_beneficiary_message: action.payload.message,
    });
}
const beneficiaryStoreUnSuccessFul = (state, action) => {
    return updateObject(state, {
        store_beneficiary_status: action.payload.status,
        store_beneficiary_message: action.payload.message,
    });
}


const beneficiaryStoreReset = (state, action) => {
    return updateObject(state, {
        store_beneficiary_status: null,
        store_beneficiary_message: null,

        store_batch_beneficiary_status: null,
        store_batch_beneficiary_message: null,

        delete_beneficiary_status: null,
        update_beneficiary_status: null
    });
}


const beneficiaryStoreBatchSuccessful = (state, action) => {
    return updateObject(state, {
        store_batch_beneficiary_status: action.payload.status,
        store_batch_beneficiary_message: action.payload.message,
    });
}
const beneficiaryStoreBatchUnsuccessful = (state, action) => {
    return updateObject(state, {
        store_batch_beneficiary_status: action.payload.status,
        store_batch_beneficiary_message: action.payload.message,
    });
}


const beneficiaryGetAllSuccessful = (state, action) => {
    return updateObject(state, {
        meta: action.payload.meta,
        beneficiaries: action.payload.data,
        get_beneficiaries_status: action.payload.status,
        get_beneficiaries_message: action.payload.message,
    });
}
const beneficiaryGetAllUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_beneficiaries_status: action.payload.status,
        get_beneficiaries_message: action.payload.message,
    });
}


const beneficiaryDeleteSuccessful = (state, action) => {
    return {
        ...state,
        delete_beneficiary_status: 200,
        beneficiaries: [...state.beneficiaries].filter(beneficiary => {
            return beneficiary.slug !== action.payload.slug
        })
    }
}
const beneficiaryDeleteUnsuccessful = (state, action) => {
    return {
        ...state
    }
}



const beneficiaryCreateDependencySuccessFul = (state, action) => {
    return updateObject(state, {
        sectors: action.payload.data.sectors,
        get_dependency_status: action.payload.status,
        dependency_policies: action.payload.data.policies,
        dependency_organization_profiles: action.payload.data.organization_profiles,
    });
}
const beneficiaryCreateDependencyUnSuccessFul = (state, action) => {
    return updateObject(state, {
        get_dependency_status: action.payload.status,
    });
}



const beneficiaryGetSuccessful = (state, action) => {
    return updateObject(state, {
        get_beneficiary_status: action.payload.status,

        sectors: action.payload.data.sectors,
        beneficiary: action.payload.data.beneficiary,
        dependency_policies: action.payload.data.policies,
        dependency_organization_profiles: action.payload.data.organization_profiles,
    });
}
const beneficiaryGetUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_beneficiary_status: action.payload.status,
    });
}


const beneficiaryUpdateSuccessFul = (state, action) => {
    return updateObject(state, {
        beneficiary: action.payload.data,
        update_beneficiary_status: action.payload.status,
    });
}
const beneficiaryUpdateUnSuccessFul = (state, action) => {
    return updateObject(state, {
        update_beneficiary_status: action.payload.status,
    });
}


const initialState = {
    beneficiary: null,
    transaction: null,

    store_beneficiary_status: null,
    store_beneficiary_message: null,

    store_batch_beneficiary_status: null,
    store_batch_beneficiary_message: null,

    meta: null,
    beneficiaries: [],

    get_beneficiaries_status: null,
    get_beneficiaries_message: null,

    delete_beneficiary_status: null,

    sectors: null,
    dependency_policies: null,
    get_dependency_status: null,
    dependency_organization_profiles: null,

    get_beneficiary_status: null,
    update_beneficiary_status: null,
};


const reducer = (state = initialState, action) => {

    const lookup = {
        [BENEFICIARY.STORE_SUCCESSFUL]: beneficiaryStoreSuccessFul,
        [BENEFICIARY.STORE_UNSUCCESSFUL]: beneficiaryStoreUnSuccessFul,

        [BENEFICIARY.RESET_STORE]: beneficiaryStoreReset,

        [BENEFICIARY.STORE_BATCH_SUCCESSFUL]: beneficiaryStoreBatchSuccessful,
        [BENEFICIARY.STORE_BATCH_UNSUCCESSFUL]: beneficiaryStoreBatchUnsuccessful,

        [BENEFICIARY.GET_ALL_SUCCESSFUL]: beneficiaryGetAllSuccessful,
        [BENEFICIARY.GET_ALL_UNSUCCESSFUL]: beneficiaryGetAllUnsuccessful,

        [BENEFICIARY.DELETE_SUCCESSFUL]: beneficiaryDeleteSuccessful,
        [BENEFICIARY.DELETE_UNSUCCESSFUL]: beneficiaryDeleteUnsuccessful,

        [BENEFICIARY.CREATE_DEPENDENCY_SUCCESSFUL]: beneficiaryCreateDependencySuccessFul,
        [BENEFICIARY.CREATE_DEPENDENCY_UNSUCCESSFUL]: beneficiaryCreateDependencyUnSuccessFul,

        [BENEFICIARY.GET_SUCCESSFUL]: beneficiaryGetSuccessful,
        [BENEFICIARY.GET_UNSUCCESSFUL]: beneficiaryGetUnsuccessful,

        [BENEFICIARY.UPDATE_SUCCESSFUL]: beneficiaryUpdateSuccessFul,
        [BENEFICIARY.UPDATE_UNSUCCESSFUL]: beneficiaryUpdateUnSuccessFul,

    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
import { updateObject } from '../utils/updateObject';
import { ORGANIZATION_PROFILE } from '../constants/OrganizationProfile.constant';


const organizationProfileStoreSuccessFul = (state, action) => {
    return updateObject(state, {
        organization_profile: action.payload.data,
        store_organization_profile_status: action.payload.status,
        store_organization_profile_message: action.payload.message,
    });
}
const organizationProfileStoreUnSuccessFul = (state, action) => {
    return updateObject(state, {
        store_organization_profile_status: action.payload.status,
        store_organization_profile_message: action.payload.message,
    });
}




const organizationProfileStoreReset = (state, action) => {
    return updateObject(state, {
        store_organization_profile_status: null,
        store_organization_profile_message: null,
        delete_organization_profile_status: null,
        store_batch_organization_profile_status: null,
    });
}



const organizationProfileGetAllTypeSuccessFul = (state, action) => {
    return updateObject(state, {
        meta: action.payload.meta,
        organization_profiles: action.payload.data,
        get_organization_profiles_status: action.payload.status,
        get_organization_profiles_message: action.payload.message,
    });
}
const organizationProfileGetAllTypeUnsuccessFul = (state, action) => {
    return updateObject(state, {
        get_organization_profiles_status: action.payload.status,
        get_organization_profiles_message: action.payload.message,
    });
}



const organizationProfileStoreBatchSuccessful = (state, action) => {
    return updateObject(state, {
        store_batch_organization_profile_status: action.payload.status,
        store_batch_organization_profile_message: action.payload.message,
    });
}
const organizationProfileStoreBatchUnsuccessful = (state, action) => {
    return updateObject(state, {
        store_batch_organization_profile_status: action.payload.status,
        store_batch_organization_profile_message: action.payload.message,
    });
}



const providerBeneficiarySuccessful = (state, action) => {
    return updateObject(state, {
        provider_beneficiaries: action.payload.data,
        provider_my_beneficiary_meta: action.payload.meta,
        get_provider_beneficiary_status: action.payload.status,
        get_provider_beneficiary_message: action.payload.message,
    });
}
const providerBeneficiaryUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_provider_beneficiary_status: action.payload.status,
        get_provider_beneficiary_status: action.payload.message,
    });
}



const companyBeneficiarySuccessful = (state, action) => {
    return updateObject(state, {
        company_beneficiaries: action.payload.data,
        company_my_beneficiary_meta: action.payload.meta,
        get_company_beneficiary_status: action.payload.status,
        get_company_beneficiary_message: action.payload.message,
    });
}
const companyBeneficiaryUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_company_beneficiary_status: action.payload.status,
        get_company_beneficiary_status: action.payload.message,
    });
}


const organizationProfileDeleteSuccessful = (state, action) => {
    return {
        ...state,
        delete_organization_profile_status: 200,
        organization_profiles: [...state.organization_profiles].filter(organization_profile => {
            return organization_profile.slug !== action.payload.slug
        })
    }
}
const organizationProfileDeleteUnsuccessful = (state, action) => {
    return {
        ...state
    }
}



const organizationProfileGetDependencySuccessful = (state, action) => {
    return updateObject(state, {
        sectors: action.payload.data.sectors,
        policies: action.payload.data.policies,
        get_dependency_status: action.payload.status,
    });
}
const organizationProfileGetDependencyUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_dependency_status: action.payload.status,
    });
}


const initialState = {
    meta: null,
    organization_profile: null,
    organization_profiles: null,

    store_organization_profile_status: null,
    store_organization_profile_message: null,

    store_batch_organization_profile_status: null,
    store_batch_organization_profile_message: null,

    provider_beneficiaries: null,
    provider_my_beneficiary_meta: null,
    get_provider_beneficiary_status: null,
    get_provider_beneficiary_message: null,

    company_beneficiaries: [],
    company_my_beneficiary_meta: null,
    get_company_beneficiary_status: null,
    get_company_beneficiary_message: null,

    delete_organization_profile_status: null,

    get_dependency_status: null,
    policies: null,
    sectors: null,
};


const reducer = (state = initialState, action) => {
    const lookup = {
        [ORGANIZATION_PROFILE.SUCCESSFUL]: organizationProfileStoreSuccessFul,
        [ORGANIZATION_PROFILE.UNSUCCESSFUL]: organizationProfileStoreUnSuccessFul,
        [ORGANIZATION_PROFILE.RESET_STORE]: organizationProfileStoreReset,

        [ORGANIZATION_PROFILE.GET_ALL_TYPE_SUCCESSFUL]: organizationProfileGetAllTypeSuccessFul,
        [ORGANIZATION_PROFILE.GET_ALL_TYPE_UNSUCCESSFUL]: organizationProfileGetAllTypeUnsuccessFul,

        [ORGANIZATION_PROFILE.STORE_BATCH_SUCCESSFUL]: organizationProfileStoreBatchSuccessful,
        [ORGANIZATION_PROFILE.STORE_BATCH_UNSUCCESSFUL]: organizationProfileStoreBatchUnsuccessful,

        [ORGANIZATION_PROFILE.PROVIDER_BENEFICIARY_SUCCESSFUL]: providerBeneficiarySuccessful,
        [ORGANIZATION_PROFILE.PROVIDER_BENEFICIARY_UNSUCCESSFUL]: providerBeneficiaryUnsuccessful,

        [ORGANIZATION_PROFILE.COMPANY_BENEFICIARY_SUCCESSFUL]: companyBeneficiarySuccessful,
        [ORGANIZATION_PROFILE.COMPANY_BENEFICIARY_UNSUCCESSFUL]: companyBeneficiaryUnsuccessful,

        [ORGANIZATION_PROFILE.DELETE_SUCCESSFUL]: organizationProfileDeleteSuccessful,
        [ORGANIZATION_PROFILE.DELETE_UNSUCCESSFUL]: organizationProfileDeleteUnsuccessful,

        [ORGANIZATION_PROFILE.GET_DEPENDENCY_SUCCESSFUL]: organizationProfileGetDependencySuccessful,
        [ORGANIZATION_PROFILE.GET_DEPENDENCY_UNSUCCESSFUL]: organizationProfileGetDependencyUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
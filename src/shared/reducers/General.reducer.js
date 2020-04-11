import { GENERAL } from '../constants/General.constant';
import { updateObject } from '../utils/updateObject';

const GeneralStoreReset = (state, action) => {
    return updateObject(state, {
        get_registration_status: null,
        get_registration_message: null,

        registration: null,
        data: null,
        status: null,
        message: null
    });
}

const GeneralRegistrationGetSuccessful = (state, action) => {
    return updateObject(state, {
        registration: action.payload.data,
        get_registration_status: action.payload.status,
        get_registration_message: action.payload.message,
    });
}

const GeneralRegistrationGetUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_registration_status: action.payload.status,
        get_registration_message: action.payload.message,
    });
}

const ProviderProfileGetSuccessful = (state, action) => {
    return updateObject(state, {
        data: action.payload.data,
        status: action.payload.status,
        message: action.payload.message,
    });
}

const ProviderProfileGetUnSuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
    });
}

const ProviderProfileUpdateSuccessful = (state, action) => {
    return updateObject(state, {
        data: action.payload.data,
        status: action.payload.status,
        message: action.payload.message,
    });
}

const ProviderProfileUpdateUnSuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
    });
}

const initialState = {
    registration: null,

    data: null,
    status: null,
    message: null,

    get_registration_message: null,
    get_registration_status: null,
};


const reducer = (state = initialState, action) => {
    const GET_REGISTRATION_SUCCESSFUL = GENERAL.GET_REGISTRATION_SUCCESSFUL;
    const GET_REGISTRATION_UNSUCCESSFUL = GENERAL.GET_REGISTRATION_UNSUCCESSFUL;
    const GET_ORGANIZATION_SUCCESSFUL = GENERAL.GET_ORGANIZATION_SUCCESSFUL;
    const GET_ORGANIZATION_UNSUCCESSFUL = GENERAL.GET_ORGANIZATION_UNSUCCESSFUL;

    const lookup = {
        [GET_REGISTRATION_SUCCESSFUL]: GeneralRegistrationGetSuccessful,
        [GET_REGISTRATION_UNSUCCESSFUL]: GeneralRegistrationGetUnsuccessful,
        [GET_ORGANIZATION_SUCCESSFUL]: ProviderProfileGetSuccessful,
        [GET_ORGANIZATION_UNSUCCESSFUL]: ProviderProfileGetUnSuccessful,
        [GENERAL.UPDATE_ORGANIZATION_SUCCESSFUL]: ProviderProfileUpdateSuccessful,
        [GENERAL.UPDATE_ORGANIZATION_UNSUCCESSFUL]: ProviderProfileUpdateUnSuccessful,

        GENERAL_RESET_STORE: GeneralStoreReset,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
import { DEPENDANT } from '../constants/Dependant.constant';
import { updateObject } from '../utils/updateObject';

const dependantStoreSuccessFul = (state, action) => {
    return updateObject(state, {
        dependant: action.payload.data,
        store_dependant_status: action.payload.status,
        store_dependant_message: action.payload.message,
    });
}
const dependantStoreUnSuccessFul = (state, action) => {
    return updateObject(state, {
        store_dependant_status: action.payload.status,
        store_dependant_message: action.payload.message,
    });
}


const dependantStoreReset = (state, action) => {
    return updateObject(state, {
        store_dependant_status: null,
        store_dependant_message: null,
    });
}


const dependantGetSuccessful = (state, action) => {
    return updateObject(state, {
        dependants: action.payload.data,
        get_dependants_status: action.payload.status,
        get_dependants_message: action.payload.message,
    });
}
const dependantGetUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_dependants_status: action.payload.status,
        get_dependants_message: action.payload.message,
    });
}



const initialState = {
    dependant: null,

    store_dependant_status: null,
    store_dependant_message: null,

    dependants: null,
    get_dependants_status: null,
    get_dependants_message: null,
};


const reducer = (state = initialState, action) => {
    const DEPENDANT_STORE_SUCCESSFUL = DEPENDANT.STORE_SUCCESSFUL;
    const DEPENDANT_STORE_UNSUCCESSFUL = DEPENDANT.STORE_UNSUCCESSFUL;

    const DEPENDANT_RESET_STORE = DEPENDANT.RESET_STORE;

    const DEPENDANT_GET_SUCCESSFUL = DEPENDANT.GET_SUCCESSFUL;
    const DEPENDANT_GET_UNSUCCESSFUL = DEPENDANT.GET_UNSUCCESSFUL;

    const lookup = {
        DEPENDANT_STORE_SUCCESSFUL: dependantStoreSuccessFul,
        DEPENDANT_STORE_UNSUCCESSFUL: dependantStoreUnSuccessFul,

        DEPENDANT_RESET_STORE: dependantStoreReset,

        DEPENDANT_GET_SUCCESSFUL: dependantGetSuccessful,
        DEPENDANT_GET_UNSUCCESSFUL: dependantGetUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
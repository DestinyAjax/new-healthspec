import { ENROLLEE } from "../constants/Enrollee.constant";
import { updateObject } from "../utils/updateObject";

const getEnrolleesSuccessful = (state, action) => {
    return updateObject(state, {
        enrollees: action.payload.data,
        meta: action.payload.meta,
        get_enrollees_status: action.payload.status,
        get_enrollees_message: action.payload.message
    });
};
const getEnrolleesUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_enrollees_status: action.payload.status,
        get_enrollees_message: action.payload.message
    });
};

const getEnrolleeSuccessful = (state, action) => {
    return updateObject(state, {
        enrollee: action.payload.data,
        get_enrollee_status: action.payload.status,
        get_enrollee_message: action.payload.message
    });
};
const getEnrolleeUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_enrollee_status: action.payload.status,
        get_enrollee_message: action.payload.message
    });
};

const getEnrolleeReset = (state, action) => {
    return updateObject(state, {
        enrollee: null,
        get_enrollee_status: null,
        get_enrollee_message: null
    });
};

const initialState = {
    enrollee: null,
    get_enrollees_status: null,
    get_enrollees_message: null,

    get_enrollee_status: null,
    get_enrollee_message: null
};

const reducer = (state = initialState, action) => {
    const lookup = {
        [ENROLLEE.GET_ALL_SUCCESSFUL]: getEnrolleesSuccessful,
        [ENROLLEE.GET_ALL_UNSUCCESSFUL]: getEnrolleesUnsuccessful,

        [ENROLLEE.GET_SUCCESSFUL]: getEnrolleeSuccessful,
        [ENROLLEE.GET_UNSUCCESSFUL]: getEnrolleeUnsuccessful,

        [ENROLLEE.RESET_STORE]: getEnrolleeReset
    };
    return lookup[action.type] ? lookup[action.type](state, action) : state;
};

export default reducer;

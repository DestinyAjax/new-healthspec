import { TREATMENT_CASE } from "../constants/TreatmentCase.constant";
import { updateObject } from "../utils/updateObject";

const treatmentStoreSuccessFul = (state, action) => {
    return updateObject(state, {
        treatment: action.payload.data,
        store_treatment_status: action.payload.status,
        store_treatment_message: action.payload.message
    });
};

const treatmentStoreUnSuccessFul = (state, action) => {
    return updateObject(state, {
        store_treatment_status: action.payload.status,
        store_treatment_message: action.payload.message
    });
};

const treatmentGetAllSuccessful = (state, action) => {
    return updateObject(state, {
        meta: action.payload.meta,
        treatments: action.payload.data,
        get_treatments_status: action.payload.status,
        get_treatments_message: action.payload.message
    });
};
const treatmentGetAllUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_treatments_status: action.payload.status,
        get_treatments_message: action.payload.message
    });
};

const getTreatmentSuccessful = (state, action) => {
    return updateObject(state, {
        treatment: action.payload.data,
        get_treatment_status: action.payload.status,
        get_treatment_message: action.payload.message
    });
};
const getTreatmentUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_treatment_status: action.payload.status,
        get_treatment_message: action.payload.message
    });
};

const treatmentUpdateSuccessFul = (state, action) => {
    return updateObject(state, {
        treatment: action.payload.data,
        update_treatment_status: action.payload.status,
        update_treatment_message: action.payload.message
    });
};
const treatmentUpdateUnSuccessFul = (state, action) => {
    return updateObject(state, {
        update_treatment_status: action.payload.status,
        update_treatment_message: action.payload.message
    });
};

const initialState = {
    treatment: null,

    store_treatment_status: null,
    store_treatment_message: null,

    meta: null,
    treatments: [],
    get_treatments_status: null,
    get_treatments_message: null,

    delete_treatment_status: null,

    get_treatment_status: null,
    get_treatment_message: null,

    update_treatment_status: null,
    update_treatment_message: null
};

const reducer = (state = initialState, action) => {
    // const treatment_SUCCESSFUL = treatment.SUCCESSFUL;
    // const treatment_UNSUCCESSFUL = treatment.UNSUCCESSFUL;
    const lookup = {
        [TREATMENT_CASE.SUCCESSFUL]: treatmentStoreSuccessFul,
        [TREATMENT_CASE.UNSUCCESSFUL]: treatmentStoreUnSuccessFul,
        [TREATMENT_CASE.GET_ALL_SUCCESSFUL]: treatmentGetAllSuccessful,
        [TREATMENT_CASE.GET_ALL_UNSUCCESSFUL]: treatmentGetAllUnsuccessful,
        [TREATMENT_CASE.GET_SUCCESSFUL]: getTreatmentSuccessful,
        [TREATMENT_CASE.GET_ALL_UNSUCCESSFUL]: getTreatmentUnsuccessful,
        [TREATMENT_CASE.UPDATE_SUCCESSFUL]: treatmentUpdateSuccessFul,
        [TREATMENT_CASE.UPDATE_UNSUCCESSFUL]: treatmentUpdateUnSuccessFul
    };
    return lookup[action.type] ? lookup[action.type](state, action) : state;
};

export default reducer;

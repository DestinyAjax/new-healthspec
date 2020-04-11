import { updateObject } from '../utils/updateObject';
import { ENCOUNTER } from '../constants/Encounter.constant';


const getEncounterQuerySuccessFul = (state, action) => {
    return updateObject(state, {
        user: action.payload.data.user,
        role_users: action.payload.data.role_users,
        get_encounter_query_status: action.payload.status,
        previous_encounters: action.payload.data.encounters,
    });
}
const getEncounterQueryUnSuccessFul = (state, action) => {
    return updateObject(state, {
        get_encounter_query_status: action.payload.status,
    });
}



const resetGetEncounterQuery = (state, action) => {
    return updateObject(state, {
        user: null,
        role_users: null,
        previous_encounters: null,
        get_encounter_query_status: null,
    });
}


const storeEncounterSuccessful = (state, action) => {
    return updateObject(state, {
        encounter: action.payload.data,
        store_encounter_status: action.payload.status,
    });
}
const storeEncounterUnsuccessful = (state, action) => {
    return updateObject(state, {
        store_encounter_status: action.payload.status,
    });
}


const resetStoreEncounter = (state, action) =>  {
    return updateObject(state, {
        encounter: null,
        store_encounter_status: null,
    });
}


const encounterGetAllForSuccessful = (state, action) => {
    return updateObject(state, {
        meta: action.payload.meta,
        encounters: action.payload.data,
        encounter_get_all_for_status: action.payload.status,
    });
}
const encounterGetAllForUnsuccessful = (state, action) => {
    return updateObject(state, {
        encounter_get_all_for_status: action.payload.status,
    });
}


const initialState = {
    user: null,
    role_users: null,
    previous_encounters: null,

    encounter: null,
    store_encounter_status: null,

    get_encounter_query_status: null,

    meta: null,
    encounters: null,
    encounter_get_all_for_status: null,
};


const reducer = (state = initialState, action) => {
    const ENCOUNTER_GET_QUERY_SUCCESSFUL = ENCOUNTER.GET_QUERY_SUCCESSFUL;
    const ENCOUNTER_GET_QUERY_UNSUCCESSFUL = ENCOUNTER.GET_QUERY_UNSUCCESSFUL;

    const ENCOUNTER_RESET_GET_QUERY = ENCOUNTER.RESET_GET_QUERY;

    const ENCOUNTER_STORE_SUCCESSFUL = ENCOUNTER.STORE_SUCCESSFUL;
    const ENCOUNTER_STORE_UNSUCCESSFUL = ENCOUNTER.STORE_UNSUCCESSFUL;


    const ENCOUNTER_STORE_RESET = ENCOUNTER.STORE_RESET;

    const ENCOUNTER_GET_ALL_FOR_SUCCESSFUL = ENCOUNTER.GET_ALL_FOR_SUCCESSFUL;
    const ENCOUNTER_GET_ALL_FOR_UNSUCCESSFUL = ENCOUNTER.GET_ALL_FOR_UNSUCCESSFUL;


    const lookup = {
        ENCOUNTER_GET_QUERY_SUCCESSFUL: getEncounterQuerySuccessFul,
        ENCOUNTER_GET_QUERY_UNSUCCESSFUL: getEncounterQueryUnSuccessFul,

        ENCOUNTER_RESET_GET_QUERY: resetGetEncounterQuery,

        ENCOUNTER_STORE_SUCCESSFUL: storeEncounterSuccessful,
        ENCOUNTER_STORE_UNSUCCESSFUL: storeEncounterUnsuccessful,

        ENCOUNTER_STORE_RESET: resetStoreEncounter,

        ENCOUNTER_GET_ALL_FOR_SUCCESSFUL: encounterGetAllForSuccessful,
        ENCOUNTER_GET_ALL_FOR_UNSUCCESSFUL: encounterGetAllForUnsuccessful
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
import { GUEST } from '../constants/Guest.constant';
import { updateObject } from '../utils/updateObject';


const getDefaultDataWasSuccessFul = (state, action) => {
    return updateObject(state, {
        company: action.payload.data.company,
        policies: action.payload.data.policies,
        providers: action.payload.data.providers,
        get_default_data_status: action.payload.status,
        agent_role_user_id: action.payload.data.agent_role_user_id,
        organization_profiles: action.payload.data.organization_profiles,
    });
}


const getDefaultDataWasUnSuccessFul = (state, action) => {
    return updateObject(state, {
        get_default_data_status: action.payload.status,
        get_default_data_message: action.payload.message,
    });
}



const getServiceWasSuccessFul = (state, action) => {
    return updateObject(state, {
        services: action.payload.data,
        get_services_status: action.payload.status,
    });
}
const getServiceWasUnSuccessFul = (state, action) => {
    return updateObject(state, {
        get_services_status: action.payload.status,
    });
}




const initialState = {
    company: null,
    policies: null,
    providers: null,
    agent_role_user_id: null,
    get_default_data_status: null,
    get_default_data_message: null,

    services: null,
    get_services_status: null,
};


const reducer = (state = initialState, action) => {
    const lookup = {
        [GUEST.DEFAULT_DATA_SUCCESSFUL]: getDefaultDataWasSuccessFul,
        [GUEST.DEFAULT_DATA_UNSUCCESSFUL]: getDefaultDataWasUnSuccessFul,

        [GUEST.GET_SERVICES_SUCCESSFUL]: getServiceWasSuccessFul,
        [GUEST.GET_SERVICES_UNSUCCESSFUL]: getServiceWasUnSuccessFul,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
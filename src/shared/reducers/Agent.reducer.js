import { AGENT } from '../constants/Agent.constant';
import { updateObject } from '../utils/updateObject';

const agentStoreSuccessFul = (state, action) => {
    return updateObject(state, {
        agent: action.payload.data,
        store_agent_status: action.payload.status,
        store_agent_message: action.payload.message,
    });
}
const agentStoreUnSuccessFul = (state, action) => {
    return updateObject(state, {
        store_agent_status: action.payload.status,
        store_agent_message: action.payload.message,
    });
}


const agentStoreReset = (state, action) => {
    return updateObject(state, {
        store_agent_status: null,
        store_agent_message: null,

        store_batch_agent_status: null,
        store_batch_agent_message: null,

        delete_agent_status: null
    });
}


const agentStoreBatchSuccessful = (state, action) => {
    return updateObject(state, {
        store_batch_agent_status: action.payload.status,
        store_batch_agent_message: action.payload.message,
    });
}
const agentStoreBatchUnsuccessful = (state, action) => {
    return updateObject(state, {
        store_batch_agent_status: action.payload.status,
        store_batch_agent_message: action.payload.message,
    });
}


const agentGetAllSuccessful = (state, action) => {
    return updateObject(state, {
        agents: action.payload.data,
        agent_meta: action.payload.meta,
        get_agent_status: action.payload.status,
        get_agent_message: action.payload.message,
    });
}
const agentGetAllUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_agent_status: action.payload.status,
        get_agent_message: action.payload.message,
    });
}



const agentDeleteSuccessful = (state, action) => {
    return {
        ...state,
        delete_agent_status: 200,
        agents: [...state.agents].filter(agent => {
            return agent.slug !== action.payload.slug
        })
    }
}
const agentDeleteUnsuccessful = (state, action) => {
    return {
        ...state
    }
}



const agentGetBeneficiarySuccessful = (state, action) => {
    return updateObject(state, {
        meta: action.payload.meta,
        agent_beneficiaries: action.payload.data,
        get_beneficiaries_status: action.payload.status,
    });
}
const agentGetBeneficiaryUnSuccessful = (state, action) => {
    return updateObject(state, {
        get_beneficiaries_status: action.payload.status,
    });
}


const initialState = {
    agent: null,

    store_agent_status: null,
    store_agent_message: null,

    store_batch_agent_status: null,
    store_batch_agent_message: null,

    agents: [],
    meta: null,
    agent_meta: null,

    get_agent_status: null,
    get_agent_message: null,

    delete_agent_status: null,

    get_beneficiaries_status: null,
    agent_beneficiaries: []
};


const reducer = (state = initialState, action) => {
    const AGENT_STORE_SUCCESSFUL = AGENT.STORE_SUCCESSFUL;
    const AGENT_STORE_UNSUCCESSFUL = AGENT.STORE_UNSUCCESSFUL;

    const AGENT_RESET_STORE = AGENT.RESET_STORE;

    const AGENT_STORE_BATCH_SUCCESSFUL = AGENT.STORE_BATCH_SUCCESSFUL;
    const AGENT_STORE_BATCH_UNSUCCESSFUL = AGENT.STORE_BATCH_UNSUCCESSFUL;

    const AGENT_GET_ALL_SUCCESSFUL = AGENT.GET_ALL_SUCCESSFUL;
    const AGENT_GET_ALL_UNSUCCESSFUL = AGENT.GET_ALL_UNSUCCESSFUL;

    const AGENT_DELETE_SUCCESSFUL = AGENT.DELETE_SUCCESSFUL;
    const AGENT_DELETE_UNSUCCESSFUL = AGENT.DELETE_UNSUCCESSFUL;

    const AGENT_GET_ALL_BENEFICIARY_SUCCESSFUL = AGENT.GET_ALL_BENEFICIARY_SUCCESSFUL;
    const AGENT_GET_ALL_BENEFICIARY_UNSUCCESSFUL = AGENT.GET_ALL_BENEFICIARY_UNSUCCESSFUL;

    const lookup = {
        AGENT_STORE_SUCCESSFUL: agentStoreSuccessFul,
        AGENT_STORE_UNSUCCESSFUL: agentStoreUnSuccessFul,

        AGENT_RESET_STORE: agentStoreReset,

        AGENT_STORE_BATCH_SUCCESSFUL: agentStoreBatchSuccessful,
        AGENT_STORE_BATCH_UNSUCCESSFUL: agentStoreBatchUnsuccessful,

        AGENT_GET_ALL_SUCCESSFUL: agentGetAllSuccessful,
        AGENT_GET_ALL_UNSUCCESSFUL: agentGetAllUnsuccessful,

        AGENT_DELETE_SUCCESSFUL: agentDeleteSuccessful,
        AGENT_DELETE_UNSUCCESSFUL: agentDeleteUnsuccessful,

        AGENT_GET_ALL_BENEFICIARY_SUCCESSFUL: agentGetBeneficiarySuccessful,
        AGENT_GET_ALL_BENEFICIARY_UnSUCCESSFUL: agentGetBeneficiaryUnSuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
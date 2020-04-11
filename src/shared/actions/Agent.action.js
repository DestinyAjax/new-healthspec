import { AGENT } from '../constants/Agent.constant';


export const storeAgent = payload => ({
    type: AGENT.STORE,
    payload
});
export const storeAgentSuccessful = payload => ({
    type: AGENT.STORE_SUCCESSFUL,
    payload
});
export const storeAgentUnsuccessful = payload => ({
    type: AGENT.STORE_UNSUCCESSFUL,
    payload
});



export const storeBatchAgent = payload => ({
    type: AGENT.STORE_BATCH,
    payload
});
export const storeBatchAgentSuccessful = payload => ({
    type: AGENT.STORE_BATCH_SUCCESSFUL,
    payload
});
export const storeBatchAgentUnsuccessful = payload => ({
    type: AGENT.STORE_BATCH_UNSUCCESSFUL,
    payload
});



export const resetStoreAgent = payload => ({
    type: AGENT.RESET_STORE,
    payload
});



export const getAgents = payload => ({
    type: AGENT.GET_ALL,
    payload
});
export const getAgentsSuccessful = payload => ({
    type: AGENT.GET_ALL_SUCCESSFUL,
    payload
});
export const getAgentsUnsuccessful = payload => ({
    type: AGENT.GET_ALL_UNSUCCESSFUL,
    payload
});



export const deleteAgent = payload => ({
    type: AGENT.DELETE,
    payload
});
export const deleteAgentSuccessful = payload => ({
    type: AGENT.DELETE_SUCCESSFUL,
    payload
});
export const deleteAgentUnsuccessful = payload => ({
    type: AGENT.DELETE_UNSUCCESSFUL,
    payload
});



export const getBeneficiaries = payload => ({
    type: AGENT.GET_ALL_BENEFICIARY,
    payload
});
export const getBeneficiariesSuccessful = payload => ({
    type: AGENT.GET_ALL_BENEFICIARY_SUCCESSFUL,
    payload
});
export const getBeneficiariesUnsuccessful = payload => ({
    type: AGENT.GET_ALL_BENEFICIARY_UNSUCCESSFUL,
    payload
});
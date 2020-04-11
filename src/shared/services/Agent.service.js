import { get, postWithImage } from '../utils/http_client';

export const agentStore = async payload => {
    const response = await postWithImage('picture', payload, 'agent/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const agentBatchStore = async payload => {
    const response = await postWithImage('agents', payload, 'agent-batch/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const agentGetAll = async payload => {
    const response = await get(`agent/index?page=${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const deleteAgent = async payload => {
    const response = await get(`agent/delete/${payload.slug}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const getBeneficiaries = async payload => {
    const response = await get(`agent-my-beneficiary/${payload.agent_id}?page=${payload.page_number}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}
import { get, post } from '../utils/http_client';


export const claimGetAll = async payload => {
    const response = await get(`claim/index/${payload.role}/${payload.id}?page=${payload.page_number}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const claimGet = async payload => {
    const response = await get(`claim/show/${payload.id}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const claimConfirm = async payload => {
    const response = await post(payload, `claim/confirm`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const updateEncounterService = async payload => {
    const response = await post(payload, `encounter-service/update`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

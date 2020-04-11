import { get, post } from '../utils/http_client';

export const getRefer = async payload => {

    const response = await get(`treatment/show/${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }
    // getReferService(payload);

    return data;
}

export const getReferService = async payload => {

    const response = await get(`treatment/${payload}/services`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const getQuery = async payload => {

    const response = await post(payload, 'refer/get_query');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const storeRefer = async payload => {

    const response = await post(payload, 'treatment/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const updateRefer = async payload => {
    const response = await post(payload, 'treatment/services/update');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const updateReferClaims = async payload => {
    const response = await post(payload, 'treatment/claim/update');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}
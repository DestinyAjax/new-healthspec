import { get, post } from '../utils/http_client';

export const getQuery = async payload => {

    const response = await post(payload, 'encounter/get_query');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const storeEncounter = async payload => {

    const response = await post(payload, 'encounter/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const getAllFor = async payload => {

    const response = await get(`encounter/index/${payload.field}/${payload.value}/?page=${payload.page_number}`);

    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}
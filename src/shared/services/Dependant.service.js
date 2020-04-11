import { get, post } from '../utils/http_client';

export const dependantStore = async payload => {
    const response = await post(payload, 'dependant/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const dependantGet = async payload => {
    const response = await get(`dependant/index/${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}
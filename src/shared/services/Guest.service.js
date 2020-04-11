import { get } from '../utils/http_client';

export const guestDefaultData = async payload => {

    const response = await get('tenant/index');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const guestDefaultService = async payload => {

    const response = await get('service/all');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

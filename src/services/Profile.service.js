import { get, post } from '../utils/http_client';

export const getProfile = async payload => {
    const response = await get(`role_user/show/${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const updateBasicProfile = async payload => {
    const response = await post(payload.formData, payload.url);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}
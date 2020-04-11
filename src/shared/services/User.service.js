import { get, post } from '../utils/http_client';

export const userStore = async payload => {
    const response = await post(payload, 'user/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const userGetAll = async payload => {
    const response = await get(`moderator/index/${payload.organization_profile_id}/?page=${payload.page_number}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const deleteUser = async payload => {
    const response = await get(`user/delete/${payload.slug}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const getDependency = async payload => {
    const response = await get(`user/index`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}
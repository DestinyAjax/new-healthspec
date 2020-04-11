import { get, post } from '../utils/http_client';

export const roleStore = async payload => {
    const response = await post(payload, 'role/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const getRoles = async payload => {
    const response = await get(`role/index?page=${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const deleteRole = async payload => {
    const response = await get(`role/delete/${payload.slug}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const getRole = async payload => {
    const response = await get(`role/show/${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const roleUpdate = async payload => {
    const response = await post(payload, 'role/update');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

import { get, post, postWithImage } from '../utils/http_client';

export const serviceStore = async payload => {
    const response = await post(payload, 'service/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const serviceBatchStore = async payload => {
    const response = await postWithImage('services', payload, 'service-batch/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const serviceGetAll = async payload => {
    const response = await get(`service/index?page=${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const deleteService = async payload => {
    const response = await get(`service/delete/${payload.slug}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const getService = async payload => {
    const response = await get(`service/show/${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const serviceUpdate = async payload => {
    const response = await post(payload, 'service/update');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}
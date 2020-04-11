import { get, post, postWithImage } from '../utils/http_client';

export const planServiceBatchStore = async payload => {
    const response = await postWithImage('services', payload, 'plan_service-batch/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const planServiceGetAll = async payload => {
    const response = await get(`plan_service/index?page=${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const deletePlanService = async payload => {
    const response = await get(`plan_service/delete/${payload.plan_service_id}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const getPlanService = async payload => {
    const response = await get(`plan_service/show/${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const planServiceUpdate = async payload => {
    const response = await post(payload, 'plan_service/update');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const planServiceStore = async payload => {
    const response = await post(payload, 'plan_service/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const planServiceDependencies = async payload => {
    const response = await get(`plan_service/get-dependency`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

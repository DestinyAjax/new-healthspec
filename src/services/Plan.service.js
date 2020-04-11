import { get, post } from '../utils/http_client';

export const planStore = async payload => {
    const response = await post(payload, 'plan/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const getPlans = async payload => {
    const response = await get(`plan/index?page=${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const deletePlan = async payload => {
    const response = await get(`plan/delete/${payload.slug}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const getPlan = async payload => {
    const response = await get(`plan/show/${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const planUpdate = async payload => {
    const response = await post(payload, 'plan/update');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

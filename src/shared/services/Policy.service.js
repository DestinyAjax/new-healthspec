import { get, post } from '../utils/http_client';

export const policyStore = async payload => {

    const response = await post(payload, 'policy/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const policyGetAll = async payload => {
    const response = await get(`policy/index?page=${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const policyGetAllBeneficiaries = async payload => {
    const response = await get(`policy/index?page=${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const deletePolicy = async payload => {
    const response = await get(`policy/delete/${payload.slug}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const getPolicy = async payload => {
    const response = await get(`policy/show/${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const policyUpdate = async payload => {
    const response = await post(payload, 'policy/update');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const policyCreateGetDependencies = async () => {
    const response = await get('policy/get-dependency');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

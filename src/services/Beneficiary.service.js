import { get, post, postWithImage } from '../utils/http_client';

export const beneficiaryStore = async payload => {
    const response = await post(payload, 'beneficiary/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const beneficiaryUpdate = async payload => {
    const response = await post(payload, 'beneficiary/update');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const beneficiaryBatchStore = async payload => {
    const response = await postWithImage('beneficiaries', payload, 'beneficiary-batch/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const beneficiaryGetAll = async payload => {
    const response = await get(`beneficiary/index?page=${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const deleteBeneficiary = async payload => {
    const response = await get(`beneficiary/delete/${payload.slug}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const beneficiaryCreateGetDependencies = async () => {
    const response = await get('beneficiary/get-dependency');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const beneficiaryGet = async payload => {
    const response = await get(`beneficiary/edit/${payload.slug}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}
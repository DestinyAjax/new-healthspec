import { get } from '../utils/http_client';

export const getAllTypes = async payload => {

    const response = await get(`organization_profile/index/${payload.type}?page=${payload.page_number}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const getProviderBeneficiary = async payload => {

    console.dir(payload);

    const response = await get(`provider-beneficiary/${payload.slug}?page=${payload.page_number}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const getCompanyBeneficiary = async payload => {

    const response = await get(`company-beneficiary/${payload.slug}?page=${payload.page_number}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const deleteProfile = async payload => {

    const response = await get(`organization_profile/delete/${payload.slug}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const getDependency = async payload => {
    const response = await get('organization/get-dependency');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

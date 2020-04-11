import { post, postWithImage } from '../utils/http_client';

export const organizationProfileStore = async payload => {
    const response = await post(payload, 'organization_profile/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const organizationProfileBatchStore = async payload => {
    const response = await postWithImage('organization_profiles', payload, 'organization_profile-batch/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}
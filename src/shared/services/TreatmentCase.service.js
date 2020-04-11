import { post, get } from "../utils/http_client";

export const treatmentCaseStore = async payload => {
    const response = await post(payload, "treatmentcase/store");
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
};

export const getTreatment = async payload => {
    const response = await get(`treatmentcase/show/${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
};

export const treatmentUpdate = async payload => {
    const response = await get(`treatmentcase/close/${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
};

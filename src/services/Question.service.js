import { get, post } from '../utils/http_client';

export const questionStore = async payload => {
    const response = await post(payload, 'question/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const questionGetAll = async payload => {
    const response = await get(`question/index?page=${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const deleteQuestion = async payload => {
    const response = await get(`question/delete/${payload.slug}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const getQuestion = async payload => {
    const response = await get(`question/show/${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const questionUpdate = async payload => {
    const response = await post(payload, 'question/update');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

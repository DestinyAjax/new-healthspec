import { get, postWithImage, post } from '../utils/http_client';

export const postRequestWithImage = async (url, payload) => {
    const response = await postWithImage('picture', payload, url);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}

export const postRequest = async (url,payload) => {
    const response = await post(payload, url);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const getRequest = async (url) => {
    const response = await get(url);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}
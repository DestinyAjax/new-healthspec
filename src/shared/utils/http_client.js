import { getStorage } from './storage.js';
// import { unregister } from './interceptor';

import { url } from './../../config';


export const post = async (formData, end_point) => {
    let token = await getStorage('ohis:auth_token');

    let response = fetch(url + end_point, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "AuthorizationHeader": "Bearer OSUN_1234567890987654321",
            'AuthToken': token,
        },
        body: JSON.stringify(formData)
    });

    return response;
}


export const get = async end_point => {
    let token = await getStorage('ohis:auth_token');


    return fetch(url + end_point, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "AuthorizationHeader": "Bearer OSUN_1234567890987654321",
            'AuthToken': token
        },
    });
}


export const postWithImage = async (image_name, formData, end_point) => {
    let allFormData = new FormData();
    allFormData.append(image_name, formData.picture);
    allFormData.append('data', JSON.stringify(formData.data));

    let token = await getStorage('ohis:auth_token');

    return fetch(url + end_point, {
        method: 'POST',
        body: allFormData,
        headers: {
            "AuthorizationHeader": "Bearer OSUN_1234567890987654321",
            'AuthToken': token,
        }
    });
}
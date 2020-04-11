import { post } from '../utils/http_client';
import { setStorage } from '../utils/storage';

export const authStart = async payload => {

    const response = await post(payload, 'auth/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    try {
        await setStorage('ohis:auth_token', data.data.auth_token);
        await setStorage('is_first_login', data.data.is_first_login);
    } catch (error) {
        console.dir('Error storing in storage');
    }

    return data;
}
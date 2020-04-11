import { get, post } from '../utils/http_client';


export const getTransaction = async payload => {
    const response = await post(payload, `transaction/show`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const updateTransaction = async payload => {
    const response = await post(payload, 'transaction/update');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const getTransactionForUser = async payload => {
    const response = await get(`transaction/me/${payload.field}/${payload.value}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const confirmOnlinePayment = async payload => {
    const response = await post(payload, 'confirm_online_payment/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}


export const getUserTransaction = async payload => {
    const response = await post(payload, 'user/show');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}
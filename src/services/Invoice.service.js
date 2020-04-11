import { post } from '../utils/http_client';

export const confirmOnlinePayment = async payload => {
    const response = await post(payload, 'confirm_online_payment/store');
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}
import { INVOICE } from '../constants/Invoice.constant';

export const startConfirmOnlinePayment = payload => ({
    type: INVOICE.CONFIRM_ONLINE_PAYMENT,
    payload
});

export const startConfirmOnlinePaymentSuccessful = payload => ({
    type: INVOICE.CONFIRM_ONLINE_PAYMENT_SUCCESSFUL,
    payload
});

export const startConfirmOnlinePaymentUnsuccessful = payload => ({
    type: INVOICE.CONFIRM_ONLINE_PAYMENT_UNSUCCESSFUL,
    payload
});
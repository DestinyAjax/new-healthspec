import { TRANSACTION } from '../constants/Transaction.constant';


export const get = payload => ({
    type: TRANSACTION.GET,
    payload
});
export const getSuccessful = payload => ({
    type: TRANSACTION.GET_SUCCESSFUL,
    payload
});
export const getUnsuccessful = payload => ({
    type: TRANSACTION.GET_UNSUCCESSFUL,
    payload
});



export const resetGetTransaction = payload => ({
    type: TRANSACTION.RESET_GET,
    payload
});



export const updateTransaction = payload => ({
    type: TRANSACTION.UPDATE,
    payload
});
export const updateSuccessful = payload => ({
    type: TRANSACTION.UPDATE_SUCCESSFUL,
    payload
});
export const updateUnsuccessful = payload => ({
    type: TRANSACTION.UPDATE_UNSUCCESSFUL,
    payload
});



export const getAllForUser = payload => ({
    type: TRANSACTION.GET_FOR_USER,
    payload
});
export const getAllForUserSuccessful = payload => ({
    type: TRANSACTION.GET_FOR_USER_SUCCESSFUL,
    payload
});
export const getAllForUserUnsuccessful = payload => ({
    type: TRANSACTION.GET_FOR_USER_UNSUCCESSFUL,
    payload
});



export const startConfirmOnlinePayment = payload => ({
    type: TRANSACTION.CONFIRM_ONLINE_PAYMENT,
    payload
});
export const startConfirmOnlinePaymentSuccessful = payload => ({
    type: TRANSACTION.CONFIRM_ONLINE_PAYMENT_SUCCESSFUL,
    payload
});
export const startConfirmOnlinePaymentUnsuccessful = payload => ({
    type: TRANSACTION.CONFIRM_ONLINE_PAYMENT_UNSUCCESSFUL,
    payload
});



export const getUserTransactions = payload => ({
    type: TRANSACTION.GET_USER,
    payload
});
export const getUserTransactionsSuccessful = payload => ({
    type: TRANSACTION.GET_USER_SUCCESSFUL,
    payload
});
export const getUserTransactionsUnsuccessful = payload => ({
    type: TRANSACTION.GET_USER_UNSUCCESSFUL,
    payload
});



export const transactionGetUserReset = payload => ({
    type: TRANSACTION.GET_USER_RESET,
    payload
});



export const setTransaction = payload => ({
    type: TRANSACTION.SET,
    payload
});


export const resetPaymentVerification = payload => ({
    type: TRANSACTION.RESET_CONFIRM,
    payload
});
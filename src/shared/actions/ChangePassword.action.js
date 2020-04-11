import { PASSWORD } from '../constants/ChangePassword.constant';

export const storeChangePassword = payload => ({
    type: PASSWORD.CHANGE,
    payload
});

export const storeChangePasswordSuccessful = payload => ({
    type: PASSWORD.CHANGE_SUCCESSFUL,
    payload
});
export const storeChangePasswordUnsuccessful = payload => ({
    type: PASSWORD.CHANGE_UNSUCCESSFUL,
    payload
});

export const resetChangePassword = payload => ({
    type: PASSWORD.CHANGE_RESET,
    payload
});
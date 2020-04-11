import { PERMISSION } from '../constants/Permission.constant';


export const getAllPermissions = payload => ({
    type: PERMISSION.GET_ALL,
    payload
});
export const getAllPermissionsSuccessful = payload => ({
    type: PERMISSION.GET_ALL_SUCCESSFUL,
    payload
});
export const getAllPermissionsUnsuccessful = payload => ({
    type: PERMISSION.GET_ALL_UNSUCCESSFUL,
    payload
});
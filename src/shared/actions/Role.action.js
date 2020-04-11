import { ROLE } from '../constants/Role.constant';


export const storeRole = payload => ({
    type: ROLE.STORE,
    payload
});
export const storeRoleSuccessful = payload => ({
    type: ROLE.SUCCESSFUL,
    payload
});
export const storeRoleUnsuccessful = payload => ({
    type: ROLE.UNSUCCESSFUL,
    payload
});



export const resetStoreRole = payload => ({
    type: ROLE.RESET_STORE,
    payload
});
export const resetUpdateRole = payload => ({
    type: ROLE.RESET_UPDATE,
    payload
});


export const getRoles = payload => ({
    type: ROLE.GET_ALL,
    payload
});
export const getRolesSuccessful = payload => ({
    type: ROLE.GET_ALL_SUCCESSFUL,
    payload
});
export const getRolesUnsuccessful = payload => ({
    type: ROLE.GET_ALL_UNSUCCESSFUL,
    payload
});




export const deleteRole = payload => ({
    type: ROLE.DELETE,
    payload
});
export const deleteRoleSuccessful = payload => ({
    type: ROLE.DELETE_SUCCESSFUL,
    payload
});
export const deleteRoleUnsuccessful = payload => ({
    type: ROLE.DELETE_UNSUCCESSFUL,
    payload
});




export const getRole = payload => ({
    type: ROLE.GET,
    payload
});
export const getRoleSuccessful = payload => ({
    type: ROLE.GET_SUCCESSFUL,
    payload
});
export const getRoleUnsuccessful = payload => ({
    type: ROLE.GET_UNSUCCESSFUL,
    payload
});



export const updateRole = payload => ({
    type: ROLE.UPDATE,
    payload
});
export const updateRoleSuccessful = payload => ({
    type: ROLE.UPDATE_SUCCESSFUL,
    payload
});
export const updateRoleUnsuccessful = payload => ({
    type: ROLE.UPDATE_UNSUCCESSFUL,
    payload
});

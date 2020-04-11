import { USER } from '../constants/User.constant';

// export const getDependencyForUser = payload => ({
//     type: USER.DEPENDENCY,
//     payload
// });
// export const getDependencyForUserSuccessful = payload => ({
//     type: USER.DEPENDENCY_SUCCESSFUL,
//     payload
// });
// export const getDependencyForUserUnsuccessful = payload => ({
//     type: USER.DEPENDENCY_UNSUCCESSFUL,
//     payload
// });


export const storeUser = payload => ({
    type: USER.STORE,
    payload
});
export const storeUserSuccessful = payload => ({
    type: USER.STORE_SUCCESSFUL,
    payload
});
export const storeUserUnsuccessful = payload => ({
    type: USER.STORE_UNSUCCESSFUL,
    payload
});



export const resetStoreUser = payload => ({
    type: USER.RESET_STORE,
    payload
});



export const getUsers = payload => ({
    type: USER.GET_ALL,
    payload
});
export const getUsersSuccessful = payload => ({
    type: USER.GET_ALL_SUCCESSFUL,
    payload
});
export const getUsersUnsuccessful = payload => ({
    type: USER.GET_ALL_UNSUCCESSFUL,
    payload
});



export const deleteUser = payload => ({
    type: USER.DELETE,
    payload
});
export const deleteUserSuccessful = payload => ({
    type: USER.DELETE_SUCCESSFUL,
    payload
});
export const deleteUserUnsuccessful = payload => ({
    type: USER.DELETE_UNSUCCESSFUL,
    payload
});

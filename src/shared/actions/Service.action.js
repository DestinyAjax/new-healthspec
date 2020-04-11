import { SERVICE } from '../constants/Service.constant';


export const storeService = payload => ({
    type: SERVICE.STORE,
    payload
});
export const storeServiceSuccessful = payload => ({
    type: SERVICE.STORE_SUCCESSFUL,
    payload
});
export const storeServiceUnsuccessful = payload => ({
    type: SERVICE.STORE_UNSUCCESSFUL,
    payload
});



export const storeBatchService = payload => ({
    type: SERVICE.STORE_BATCH,
    payload
});
export const storeBatchServiceSuccessful = payload => ({
    type: SERVICE.STORE_BATCH_SUCCESSFUL,
    payload
});
export const storeBatchServiceUnsuccessful = payload => ({
    type: SERVICE.STORE_BATCH_UNSUCCESSFUL,
    payload
});



export const resetStoreService = payload => ({
    type: SERVICE.RESET_STORE,
    payload
});



export const getAll = payload => ({
    type: SERVICE.GET_ALL,
    payload
});
export const getAllSuccessful = payload => ({
    type: SERVICE.GET_ALL_SUCCESSFUL,
    payload
});
export const getAllUnsuccessful = payload => ({
    type: SERVICE.GET_ALL_UNSUCCESSFUL,
    payload
});



export const deleteService = payload => ({
    type: SERVICE.DELETE,
    payload
});
export const deleteServiceSuccessful = payload => ({
    type: SERVICE.DELETE_SUCCESSFUL,
    payload
});
export const deleteServiceUnsuccessful = payload => ({
    type: SERVICE.DELETE_UNSUCCESSFUL,
    payload
});



export const getService = payload => ({
    type: SERVICE.GET,
    payload
});
export const getServiceSuccessful = payload => ({
    type: SERVICE.GET_SUCCESSFUL,
    payload
});
export const getServiceUnsuccessful = payload => ({
    type: SERVICE.GET_UNSUCCESSFUL,
    payload
});


export const updateService = payload => ({
    type: SERVICE.UPDATE,
    payload
});
export const updateServiceSuccessful = payload => ({
    type: SERVICE.UPDATE_SUCCESSFUL,
    payload
});
export const updateServiceUnsuccessful = payload => ({
    type: SERVICE.UPDATE_UNSUCCESSFUL,
    payload
});


export const resetUpdateService = payload => ({
    type: SERVICE.RESET_UPDATE,
    payload
});
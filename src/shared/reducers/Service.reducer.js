import { updateObject } from "../utils/updateObject";
import { SERVICE } from "../constants/Service.constant";

const serviceStoreSuccessFul = (state, action) => {
    return updateObject(state, {
        service: action.payload.data,
        store_service_status: action.payload.status,
        store_service_message: action.payload.message
    });
};
const serviceStoreUnSuccessFul = (state, action) => {
    return updateObject(state, {
        store_service_status: action.payload.status,
        store_service_message: action.payload.message
    });
};

const serviceStoreReset = (state, action) => {
    return updateObject(state, {
        store_service_status: null,
        store_service_message: null,

        store_batch_service_status: null,
        store_batch_service_message: null,

        delete_service_status: null
    });
};

const serviceStoreBatchSuccessful = (state, action) => {
    return updateObject(state, {
        store_batch_service_status: action.payload.status,
        store_batch_service_message: action.payload.message
    });
};
const serviceStoreBatchUnsuccessful = (state, action) => {
    return updateObject(state, {
        store_batch_service_status: action.payload.status,
        store_batch_service_message: action.payload.message
    });
};

const serviceGetAllSuccessful = (state, action) => {
    return updateObject(state, {
        meta: action.payload.meta,
        services: action.payload.data,
        get_services_status: action.payload.status,
        get_services_message: action.payload.message
    });
};
const serviceGetAllUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_services_status: action.payload.status,
        get_services_message: action.payload.message
    });
};

const serviceDeleteSuccessful = (state, action) => {
    return {
        ...state,
        delete_service_status: 200,
        services: [...state.services].filter(service => {
            return service.slug !== action.payload.slug;
        })
    };
};
const serviceDeleteUnsuccessful = (state, action) => {
    return {
        ...state
    };
};

const getServiceSuccessful = (state, action) => {
    return updateObject(state, {
        service: action.payload.data,
        get_service_status: action.payload.status,
        get_service_message: action.payload.message
    });
};
const getServiceUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_service_status: action.payload.status,
        get_service_message: action.payload.message
    });
};

const serviceUpdateSuccessFul = (state, action) => {
    return updateObject(state, {
        service: action.payload.data,
        update_service_status: action.payload.status,
        update_service_message: action.payload.message
    });
};
const serviceUpdateUnSuccessFul = (state, action) => {
    return updateObject(state, {
        update_service_status: action.payload.status,
        update_service_message: action.payload.message
    });
};

const serviceUpdateReset = (state, action) => {
    return updateObject(state, {
        update_service_status: null,
        get_service_status: null
    });
};

const initialState = {
    service: null,

    store_service_status: null,
    store_service_message: null,

    store_batch_service_status: null,
    store_batch_service_message: null,

    meta: null,
    services: [],
    get_services_status: null,
    get_services_message: null,

    delete_service_status: null,

    get_service_status: null,
    get_service_message: null,

    update_service_status: null,
    update_service_message: null
};

const reducer = (state = initialState, action) => {
    const SERVICE_STORE_SUCCESSFUL = SERVICE.STORE_SUCCESSFUL;
    const SERVICE_STORE_UNSUCCESSFUL = SERVICE.STORE_UNSUCCESSFUL;
    const SERVICE_RESET_STORE = SERVICE.RESET_STORE;

    const SERVICE_STORE_BATCH_SUCCESSFUL = SERVICE.STORE_BATCH_SUCCESSFUL;
    const SERVICE_STORE_BATCH_UNSUCCESSFUL = SERVICE.STORE_BATCH_UNSUCCESSFUL;

    const SERVICE_GET_ALL_SUCCESSFUL = SERVICE.GET_ALL_SUCCESSFUL;
    const SERVICE_GET_ALL_UNSUCCESSFUL = SERVICE.GET_ALL_UNSUCCESSFUL;

    const SERVICE_DELETE_SUCCESSFUL = SERVICE.DELETE_SUCCESSFUL;
    const SERVICE_DELETE_UNSUCCESSFUL = SERVICE.DELETE_UNSUCCESSFUL;

    const SERVICE_GET_SUCCESSFUL = SERVICE.GET_SUCCESSFUL;
    const SERVICE_GET_UNSUCCESSFUL = SERVICE.GET_UNSUCCESSFUL;

    const SERVICE_UPDATE_SUCCESSFUL = SERVICE.UPDATE_SUCCESSFUL;
    const SERVICE_UPDATE_UNSUCCESSFUL = SERVICE.UPDATE_UNSUCCESSFUL;

    const SERVICE_RESET_UPDATE = SERVICE.RESET_UPDATE;

    const lookup = {
        SERVICE_STORE_SUCCESSFUL: serviceStoreSuccessFul,
        SERVICE_STORE_UNSUCCESSFUL: serviceStoreUnSuccessFul,
        SERVICE_RESET_STORE: serviceStoreReset,

        SERVICE_STORE_BATCH_SUCCESSFUL: serviceStoreBatchSuccessful,
        SERVICE_STORE_BATCH_UNSUCCESSFUL: serviceStoreBatchUnsuccessful,

        SERVICE_GET_ALL_SUCCESSFUL: serviceGetAllSuccessful,
        SERVICE_GET_ALL_UNSUCCESSFUL: serviceGetAllUnsuccessful,

        SERVICE_DELETE_SUCCESSFUL: serviceDeleteSuccessful,
        SERVICE_DELETE_UNSUCCESSFUL: serviceDeleteUnsuccessful,

        SERVICE_GET_SUCCESSFUL: getServiceSuccessful,
        SERVICE_GET_UNSUCCESSFUL: getServiceUnsuccessful,

        SERVICE_UPDATE_SUCCESSFUL: serviceUpdateSuccessFul,
        SERVICE_UPDATE_UNSUCCESSFUL: serviceUpdateUnSuccessFul,

        SERVICE_RESET_UPDATE: serviceUpdateReset
    };

    return lookup[action.type] ? lookup[action.type](state, action) : state;
};

export default reducer;

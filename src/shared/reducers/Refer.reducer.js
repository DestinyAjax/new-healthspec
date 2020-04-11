import { updateObject } from '../utils/updateObject';
import { REFER } from '../constants/Refer.constant';


const getReferQuerySuccessFul = (state, action) => {
    return updateObject(state, {
        user: action.payload.data.user,
        role_users: action.payload.data.role_users,
        get_refer_query_status: action.payload.status,
    });
}
const getReferQueryUnSuccessFul = (state, action) => {
    return updateObject(state, {
        get_refer_query_status: action.payload.status,
    });
}

const getReferSuccessFul = (state, action) => {
    return updateObject(state, {
        user: action.payload.data.user,
        refer: action.payload.data,
        get_refer_status: action.payload.status,
    });
}
const getReferUnSuccessFul = (state, action) => {
    return updateObject(state, {
        get_refer_status: action.payload.status,
    });
}

const getReferServiceSuccessFul = (state, action) => {
    return updateObject(state, {
        get_refer_service: action.payload.data,
        get_refer_service_status: action.payload.status,
    });
}
const getReferServiceUnSuccessFul = (state, action) => {
    return updateObject(state, {
        get_refer_service_status: action.payload.status,
    });
}


const storeReferSuccessful = (state, action) => {
    return updateObject(state, {
        refer: action.payload.data,
        store_refer_status: action.payload.status,
    });
}
const storeReferUnsuccessful = (state, action) => {
    return updateObject(state, {
        refer_msg: action.payload.data,
        store_refer_status: action.payload.status,
    });
}

const updateReferSuccessFul = (state, action) => {
    return updateObject(state, {
        refer: action.payload.data,
        update_refer_status: action.payload.status,
        update_refer_message: action.payload.message,
    });
}
const updateReferUnSuccessFul = (state, action) => {
    return updateObject(state, {
        update_refer_status: action.payload.status,
        update_refer_message: action.payload.message,
    });
}

const updateReferClaimsSuccessFul = (state, action) => {
    return updateObject(state, {
        refer: action.payload.data,
        update_refer_status: action.payload.status,
        update_refer_message: action.payload.message,
    });
}
const updateReferClaimsUnSuccessFul = (state, action) => {
    return updateObject(state, {
        update_refer_status: action.payload.status,
        update_refer_message: action.payload.message,
    });
}

const referStoreReset = (state, action) =>  {
    return updateObject(state, {
        get_refer_status: null,
        refer_msg: null,
        store_refer_status: null,
        update_refer_status: null,
        update_refer_message: null,
        get_refer_query_status: null,
        get_refer_service_status: null,
        get_refer_service: null,
    });
}

const referUpdateReset = (state, action) => {
    return updateObject(state, {
        update_refer_status: null,
        get_refer_status: null,
    });
}

const initialState = {
    user: null,
    role_users: null,
    get_refer_query_status: null,
    get_refer_service_status: null,
    get_refer_service: null,

    refer: null,
    get_refer_status: null,
    refer_msg: null,
    store_refer_status: null,
    update_refer_status: null,
    update_refer_message: null,
};


const reducer = (state = initialState, action) => {


    const lookup = {
        [REFER.STORE_SUCCESSFUL]: storeReferSuccessful,
        [REFER.STORE_UNSUCCESSFUL]: storeReferUnsuccessful,

        [REFER.UPDATE_SUCCESSFUL]: updateReferSuccessFul,
        [REFER.UPDATE_UNSUCCESSFUL]: updateReferUnSuccessFul,

        [REFER.UPDATE_CLAIMS_SUCCESSFUL]: updateReferClaimsSuccessFul,
        [REFER.UPDATE_CLAIMS_UNSUCCESSFUL]: updateReferClaimsUnSuccessFul,

        [REFER.GET_QUERY_SUCCESSFUL]: getReferQuerySuccessFul,
        [REFER.GET_QUERY_UNSUCCESSFUL]: getReferQueryUnSuccessFul,

        [REFER.GET_SUCCESSFUL]: getReferSuccessFul,
        [REFER.GET_UNSUCCESSFUL]: getReferUnSuccessFul,

        [REFER.GET_SERVICE_SUCCESSFUL]: getReferServiceSuccessFul,
        [REFER.GET_SERVICE_UNSUCCESSFUL]: getReferServiceUnSuccessFul,

        [REFER.STORE_RESET]: referStoreReset,

        [REFER.UPDATE_RESET]: referUpdateReset,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
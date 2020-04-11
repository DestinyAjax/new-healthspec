import { ROLE } from '../constants/Role.constant';
import { updateObject } from '../utils/updateObject';

const roleStoreSuccessFul = (state, action) => {
    return updateObject(state, {
        role: action.payload.data,
        store_role_status: action.payload.status,
        store_role_message: action.payload.message,
    });
}
const roleStoreUnSuccessFul = (state, action) => {
    return updateObject(state, {
        store_role_status: action.payload.status,
        store_role_message: action.payload.message,
    });
}

const roleStoreReset = (state, action) => {
    return updateObject(state, {
        get_role_status: null,
        store_role_status: null,
        store_role_message: null,
        delete_role_status: null,
    });
}


const getAllRolesSuccessful = (state, action) => {
    return updateObject(state, {
        roles: action.payload.data,
        meta: action.payload.meta,
        get_roles_status: action.payload.status,
        get_roles_message: action.payload.message,
    });
}
const getAllRolesUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_roles_status: action.payload.status,
        get_roles_message: action.payload.message,
    });
}


const roleDeleteSuccessful = (state, action) => {
    return {
        ...state,
        delete_role_status: 200,
        roles: [...state.roles].filter(role => {
            return role.slug !== action.payload.slug
        })
    }
}
const roleDeleteUnsuccessful = (state, action) => {
    return {
        ...state
    }
}


const getRoleSuccessful = (state, action) => {
    return updateObject(state, {
        role: action.payload.data.role,
        permissions: action.payload.data.permissions,
        get_role_status: action.payload.status,
        get_role_message: action.payload.message,
    });
}
const getRoleUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_role_status: action.payload.status,
        get_role_message: action.payload.message,
    });
}


const roleUpdateSuccessFul = (state, action) => {
    return updateObject(state, {
        role: action.payload.data,
        update_role_status: action.payload.status,
        update_role_message: action.payload.message,
    });
}
const roleUpdateUnSuccessFul = (state, action) => {
    return updateObject(state, {
        update_role_status: action.payload.status,
        update_role_message: action.payload.message,
    });
}


const roleUpdateReset = (state, action) => {
    return updateObject(state, {
        update_role_status: null,
    });
}


const initialState = {
    role: null,
    permissions: null,

    store_role_status: null,
    store_role_message: null,

    roles: null,
    meta: null,

    get_roles_status: null,
    get_roles_message: null,

    delete_role_status: null,

    get_role_status: null,
    get_role_message: null,

    update_role_status: null,
    update_role_message: null,
};


const reducer = (state = initialState, action) => {
    const ROLE_SUCCESSFUL = ROLE.SUCCESSFUL;
    const ROLE_UNSUCCESSFUL = ROLE.UNSUCCESSFUL;
    const ROLE_RESET_STORE = ROLE.RESET_STORE;

    const ROLE_GET_ALL_SUCCESSFUL = ROLE.GET_ALL_SUCCESSFUL;
    const ROLE_GET_ALL_UNSUCCESSFUL = ROLE.GET_ALL_UNSUCCESSFUL;

    const ROLE_GET_SUCCESSFUL = ROLE.GET_SUCCESSFUL;
    const ROLE_GET_UNSUCCESSFUL = ROLE.GET_UNSUCCESSFUL;

    const ROLE_DELETE_SUCCESSFUL = ROLE.DELETE_SUCCESSFUL;
    const ROLE_DELETE_UNSUCCESSFUL = ROLE.DELETE_UNSUCCESSFUL;

    const ROLE_UPDATE_SUCCESSFUL = ROLE.UPDATE_SUCCESSFUL;
    const ROLE_UPDATE_UNSUCCESSFUL = ROLE.UPDATE_UNSUCCESSFUL;

    const ROLE_RESET_UPDATE = ROLE.RESET_UPDATE;

    const lookup = {
        ROLE_SUCCESSFUL: roleStoreSuccessFul,
        ROLE_UNSUCCESSFUL: roleStoreUnSuccessFul,

        ROLE_RESET_STORE: roleStoreReset,

        ROLE_GET_ALL_SUCCESSFUL: getAllRolesSuccessful,
        ROLE_GET_ALL_UNSUCCESSFUL: getAllRolesUnsuccessful,

        ROLE_DELETE_SUCCESSFUL: roleDeleteSuccessful,
        ROLE_DELETE_UNSUCCESSFUL: roleDeleteUnsuccessful,

        ROLE_GET_SUCCESSFUL: getRoleSuccessful,
        ROLE_GET_UNSUCCESSFUL: getRoleUnsuccessful,

        ROLE_UPDATE_SUCCESSFUL: roleUpdateSuccessFul,
        ROLE_UPDATE_UNSUCCESSFUL: roleUpdateUnSuccessFul,

        ROLE_RESET_UPDATE: roleUpdateReset,
    }
    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
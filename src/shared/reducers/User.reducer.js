import { USER } from '../constants/User.constant';
import { updateObject } from '../utils/updateObject';


const userStoreSuccessFul = (state, action) => {
    return updateObject(state, {
        user: action.payload.data,
        store_user_status: action.payload.status,
    });
}
const userStoreUnSuccessFul = (state, action) => {
    return updateObject(state, {
        store_user_status: action.payload.status,
    });
}


const userStoreReset = (state, action) => {
    return updateObject(state, {
        store_user_status: null,
        store_user_message: null,

        delete_user_status: null
    });
}


const userGetAllSuccessful = (state, action) => {
    return updateObject(state, {
        users: action.payload.data,
        meta: action.payload.meta,
        get_users_status: action.payload.status,
    });
}
const userGetAllUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_users_status: action.payload.status,
    });
}



const userDeleteSuccessful = (state, action) => {
    return {
        ...state,
        delete_user_status: 200,
        users: [...state.users].filter(user => {
            return user.slug !== action.payload.slug
        })
    }
}
const userDeleteUnsuccessful = (state, action) => {
    return {
        ...state
    }
}



const userDependencySuccessful = (state, action) => {
    return updateObject(state, {
        roles: action.payload.data.roles,
        tenants: action.payload.data.tenants,
        user_get_dependency_status: action.payload.status,
    });
}
const userDependencyUnsuccessful = (state, action) => {
    return updateObject(state, {
        user_get_dependency_status: action.payload.status,
    });
}


const initialState = {
    user: null,

    get_user_status: null,
    get_users_status: null,
    store_user_status: null,
    delete_user_status: null,
    user_get_dependency_status: null,

    users: [],
    meta: null,
};


const reducer = (state = initialState, action) => {
    const lookup = {
        [USER.STORE_SUCCESSFUL]: userStoreSuccessFul,
        [USER.STORE_UNSUCCESSFUL]: userStoreUnSuccessFul,

        [USER.RESET_STORE]: userStoreReset,

        [USER.DEPENDENCY_SUCCESSFUL]: userDependencySuccessful,
        [USER.DEPENDENCY_UNSUCCESSFUL]: userDependencyUnsuccessful,

        [USER.GET_ALL_SUCCESSFUL]: userGetAllSuccessful,
        [USER.GET_ALL_UNSUCCESSFUL]: userGetAllUnsuccessful,

        [USER.DELETE_SUCCESSFUL]: userDeleteSuccessful,
        [USER.DELETE_UNSUCCESSFUL]: userDeleteUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
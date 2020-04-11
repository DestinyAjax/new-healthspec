import { AUTH } from '../constants/Auth.constant';
import { updateObject } from '../utils/updateObject';


const authWasSuccessFul = (state, action) => {
    return updateObject(state, {
        id: action.payload.data.id,
        name: action.payload.data.name,
        email: action.payload.data.email,

        roles: action.payload.data.roles,
        auth_token: action.payload.data.auth_token,
        is_first_login: action.payload.data.is_first_login,

        status: action.payload.status,
        message: action.payload.message,
    });
}

const authWasUnSuccessFul = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
    });
}

const initialState = {
    id: null,
    name: null,
    email: null,
    is_first_login: null,

    roles: null,
    auth_token: null,

    message: null,
    status: null,
};


const reducer = (state = initialState, action) => {
    const AUTH_SUCCESSFUL = AUTH.SUCCESSFUL;
    const AUTH_UNSUCCESSFUL = AUTH.UNSUCCESSFUL;

    const lookup = {
        AUTH_SUCCESSFUL: authWasSuccessFul,
        AUTH_UNSUCCESSFUL: authWasUnSuccessFul,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
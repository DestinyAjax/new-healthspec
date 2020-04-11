import { updateObject } from '../utils/updateObject';
import { PASSWORD } from '../constants/ChangePassword.constant';


const getChangePasswordSuccessFul = (state, action) => {
    return updateObject(state, {
        user: action.payload.data.user,
        msg: action.payload.data.message,
        status: action.payload.status,
    });
}
const getChangePasswordUnSuccessFul = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
    });
}

const changePasswordReset = (state, action) =>  {
    return updateObject(state, {
        user: null,
        msg: null,
        status: null
    });
}

const initialState = {
    user: null,
    msg: null,
    status: null
};


const reducer = (state = initialState, action) => {


    const lookup = {
        [PASSWORD.CHANGE_SUCCESSFUL]: getChangePasswordSuccessFul,
        [PASSWORD.CHANGE_UNSUCCESSFUL]: getChangePasswordUnSuccessFul,

        [PASSWORD.CHANGE_RESET]: changePasswordReset
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
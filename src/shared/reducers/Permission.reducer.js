import { updateObject } from '../utils/updateObject';
import { PERMISSION } from '../constants/Permission.constant';

const getAllPermissionsSuccessful = (state, action) => {
    return updateObject(state, {
        permissions: action.payload.data,
        get_permissions_status: action.payload.status,
    });
}
const getAllPermissionsUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_permissions_status: action.payload.status,
    });
}


const initialState = {
    permissions: null,
    get_permissions_status: null,
};


const reducer = (state = initialState, action) => {
    const PERMISSION_GET_ALL_SUCCESSFUL = PERMISSION.GET_ALL_SUCCESSFUL;
    const PERMISSION_GET_ALL_UNSUCCESSFUL = PERMISSION.GET_ALL_UNSUCCESSFUL;

    const lookup = {
        PERMISSION_GET_ALL_SUCCESSFUL: getAllPermissionsSuccessful,
        PERMISSION_GET_ALL_UNSUCCESSFUL: getAllPermissionsUnsuccessful,
    }
    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
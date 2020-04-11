import { updateObject } from '../utils/updateObject';
import { ROLE } from '../constants/Role.constant';

const roleChosen = (state, action) => {
    return updateObject(state, {
        role: action.payload,
    });
}

const initialState = {
    role: null,
};

const reducer = (state = initialState, action) => {
    const ROLE_CHOSEN = ROLE.CHOSEN;

    const lookup = {
        ROLE_CHOSEN: roleChosen,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
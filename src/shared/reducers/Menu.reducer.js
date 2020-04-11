import { updateObject } from '../utils/updateObject';
import { MENU } from '../constants/Menu.constant';


const toggleMenu = (state, action) => {
    return updateObject(state, {
        is_opened: !state.is_opened,
    });
}


const initialState = {
    is_opened: true,
};


const reducer = (state = initialState, action) => {
    const MENU_TOGGLE = MENU.TOGGLE;

    const lookup = {
        MENU_TOGGLE: toggleMenu,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
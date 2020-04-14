import { SHOW_MODAL, HIDE_MODAL, SET_MODAL } from './index';

const initialState = {
    modalType: null,
    modalProps: {},
    modalToggle: false
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                modalType: action.payload.modalType,
                modalProps: action.payload.modalProps,
                modalToggle: action.payload.modalToggle
            }
        case SET_MODAL:
            return {
                modalToggle: action.payload.modalToggle
            }
        case HIDE_MODAL: return initialState

        default: return state;
    }
}

export default Reducer;
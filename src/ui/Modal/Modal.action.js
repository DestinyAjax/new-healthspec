import { SHOW_MODAL, HIDE_MODAL, SET_MODAL } from './index';

export const openModal = (modalType, modalProps, modalToggle) => {

    return {
        type: SHOW_MODAL,
        payload: {
            modalType,
            modalProps,
            modalToggle
        }
    }

}

export const setModal = toggle => ({
    type: SET_MODAL,
    payload: {
        modalToggle: toggle
    }
});

export const closeModal = () => {
    return {
        type: HIDE_MODAL
    }
}
import { DEPENDANT } from '../constants/Dependant.constant';


export const storeDependant = payload => ({
    type: DEPENDANT.STORE,
    payload
});
export const storeDependantSuccessful = payload => ({
    type: DEPENDANT.STORE_SUCCESSFUL,
    payload
});
export const storeDependantUnsuccessful = payload => ({
    type: DEPENDANT.STORE_UNSUCCESSFUL,
    payload
});



export const resetStoreDependant = payload => ({
    type: DEPENDANT.RESET_STORE,
    payload
});



export const getDependants = payload => ({
    type: DEPENDANT.GET,
    payload
});
export const getDependantsSuccessful = payload => ({
    type: DEPENDANT.GET_SUCCESSFUL,
    payload
});
export const getDependantsUnsuccessful = payload => ({
    type: DEPENDANT.GET_UNSUCCESSFUL,
    payload
});


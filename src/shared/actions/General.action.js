import { GENERAL } from '../constants/General.constant';

export const resetStoreGeneral = payload => ({
    type: GENERAL.RESET_STORE,
    payload
});
export const getGeneralRegistration = payload => ({
    type: GENERAL.GET_REGISTRATION,
    payload
});
export const getGeneralRegistrationSuccessful = payload => ({
    type: GENERAL.GET_REGISTRATION_SUCCESSFUL,
    payload
});
export const getGeneralRegistrationUnsuccessful = payload => ({
    type: GENERAL.GET_REGISTRATION_UNSUCCESSFUL,
    payload
});

export const getOrganization = payload => ({
    type: GENERAL.GET_ORGANIZATION,
    payload
});
export const getOrganizationSuccessful = payload => ({
    type: GENERAL.GET_ORGANIZATION_SUCCESSFUL,
    payload
});
export const getOrganizationUnsuccessful = payload => ({
    type: GENERAL.GET_ORGANIZATION_UNSUCCESSFUL,
    payload
});

export const updateOrganization = payload => ({
    type: GENERAL.UPDATE_ORGANIZATION,
    payload
});
export const updateOrganizationSuccessful = payload => ({
    type: GENERAL.UPDATE_ORGANIZATION_SUCCESSFUL,
    payload
});
export const updateOrganizationUnsuccessful = payload => ({
    type: GENERAL.UPDATE_ORGANIZATION_UNSUCCESSFUL,
    payload
});

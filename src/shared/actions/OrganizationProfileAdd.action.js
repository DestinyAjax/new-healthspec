import { ORGANIZATION_PROFILE } from '../constants/OrganizationProfile.constant';


export const storeOrganizationProfile = payload => ({
    type: ORGANIZATION_PROFILE.STORE,
    payload
});
export const storeOrganizationProfileSuccessful = payload => ({
    type: ORGANIZATION_PROFILE.SUCCESSFUL,
    payload
});
export const storeOrganizationProfileUnsuccessful = payload => ({
    type: ORGANIZATION_PROFILE.UNSUCCESSFUL,
    payload
});



export const resetStoreOrganizationProfile = payload => ({
    type: ORGANIZATION_PROFILE.RESET_STORE,
    payload
});



export const storeBatchOrganizationProfile = payload => ({
    type: ORGANIZATION_PROFILE.STORE_BATCH,
    payload
});
export const storeBatchOrganizationProfileSuccessful = payload => ({
    type: ORGANIZATION_PROFILE.STORE_BATCH_SUCCESSFUL,
    payload
});
export const storeBatchOrganizationProfileUnsuccessful = payload => ({
    type: ORGANIZATION_PROFILE.STORE_BATCH_UNSUCCESSFUL,
    payload
});



export const getDependency = payload => ({
    type: ORGANIZATION_PROFILE.GET_DEPENDENCY,
    payload
});
export const getDependencySuccessful = payload => ({
    type: ORGANIZATION_PROFILE.GET_DEPENDENCY_SUCCESSFUL,
    payload
});
export const getDependencyUnsuccessful = payload => ({
    type: ORGANIZATION_PROFILE.GET_DEPENDENCY_UNSUCCESSFUL,
    payload
});
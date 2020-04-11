import { ORGANIZATION_PROFILE } from '../constants/OrganizationProfile.constant';


export const getAllType = payload => ({
    type: ORGANIZATION_PROFILE.GET_ALL_TYPE,
    payload
});
export const getAllTypeSuccessful = payload => ({
    type: ORGANIZATION_PROFILE.GET_ALL_TYPE_SUCCESSFUL,
    payload
});
export const getAllTypeUnsuccessful = payload => ({
    type: ORGANIZATION_PROFILE.GET_ALL_TYPE_UNSUCCESSFUL,
    payload
});



export const getProviderBeneficiary = payload => ({
    type: ORGANIZATION_PROFILE.PROVIDER_BENEFICIARY,
    payload
});
export const getProviderBeneficiarySuccessful = payload => ({
    type: ORGANIZATION_PROFILE.PROVIDER_BENEFICIARY_SUCCESSFUL,
    payload
});
export const getProviderBeneficiaryUnsuccessful = payload => ({
    type: ORGANIZATION_PROFILE.PROVIDER_BENEFICIARY_UNSUCCESSFUL,
    payload
});



export const getCompanyBeneficiary = payload => ({
    type: ORGANIZATION_PROFILE.COMPANY_BENEFICIARY,
    payload
});
export const getCompanyBeneficiarySuccessful = payload => ({
    type: ORGANIZATION_PROFILE.COMPANY_BENEFICIARY_SUCCESSFUL,
    payload
});
export const getCompanyBeneficiaryUnsuccessful = payload => ({
    type: ORGANIZATION_PROFILE.COMPANY_BENEFICIARY_UNSUCCESSFUL,
    payload
});



export const deleteOrganizationProfile = payload => ({
    type: ORGANIZATION_PROFILE.DELETE,
    payload
});
export const deleteOrganizationProfileSuccessful = payload => ({
    type: ORGANIZATION_PROFILE.DELETE_SUCCESSFUL,
    payload
});
export const deleteOrganizationProfileUnsuccessful = payload => ({
    type: ORGANIZATION_PROFILE.DELETE_UNSUCCESSFUL,
    payload
});
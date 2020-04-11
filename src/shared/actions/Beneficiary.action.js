import { BENEFICIARY } from '../constants/Beneficiary.constant';


export const storeBeneficiary = payload => ({
    type: BENEFICIARY.STORE,
    payload
});
export const storeBeneficiarySuccessful = payload => ({
    type: BENEFICIARY.STORE_SUCCESSFUL,
    payload
});
export const storeBeneficiaryUnsuccessful = payload => ({
    type: BENEFICIARY.STORE_UNSUCCESSFUL,
    payload
});


export const updateBeneficiary = payload => ({
    type: BENEFICIARY.UPDATE,
    payload
});
export const updateBeneficiarySuccessful = payload => ({
    type: BENEFICIARY.UPDATE_SUCCESSFUL,
    payload
});
export const updateBeneficiaryUnsuccessful = payload => ({
    type: BENEFICIARY.UPDATE_UNSUCCESSFUL,
    payload
});



export const storeBatchBeneficiary = payload => ({
    type: BENEFICIARY.STORE_BATCH,
    payload
});
export const storeBatchBeneficiarySuccessful = payload => ({
    type: BENEFICIARY.STORE_BATCH_SUCCESSFUL,
    payload
});
export const storeBatchBeneficiaryUnsuccessful = payload => ({
    type: BENEFICIARY.STORE_BATCH_UNSUCCESSFUL,
    payload
});


export const resetStoreBeneficiary = payload => ({
    type: BENEFICIARY.RESET_STORE,
    payload
});



export const getBeneficiaries = payload => ({
    type: BENEFICIARY.GET_ALL,
    payload
});
export const getBeneficiariesSuccessful = payload => ({
    type: BENEFICIARY.GET_ALL_SUCCESSFUL,
    payload
});
export const getBeneficiariesUnsuccessful = payload => ({
    type: BENEFICIARY.GET_ALL_UNSUCCESSFUL,
    payload
});



export const getBeneficiary = payload => ({
    type: BENEFICIARY.GET,
    payload
});
export const getBeneficiarySuccessful = payload => ({
    type: BENEFICIARY.GET_SUCCESSFUL,
    payload
});
export const getBeneficiaryUnsuccessful = payload => ({
    type: BENEFICIARY.GET_UNSUCCESSFUL,
    payload
});



export const deleteBeneficiary = payload => ({
    type: BENEFICIARY.DELETE,
    payload
});
export const deleteBeneficiarySuccessful = payload => ({
    type: BENEFICIARY.DELETE_SUCCESSFUL,
    payload
});
export const deleteBeneficiaryUnsuccessful = payload => ({
    type: BENEFICIARY.DELETE_UNSUCCESSFUL,
    payload
});



export const beneficiaryCreateDependency = payload => ({
    type: BENEFICIARY.CREATE_DEPENDENCY,
    payload
});
export const beneficiaryCreateDependencySuccessful = payload => ({
    type: BENEFICIARY.CREATE_DEPENDENCY_SUCCESSFUL,
    payload
});
export const beneficiaryCreateDependencyUnsuccessful = payload => ({
    type: BENEFICIARY.CREATE_DEPENDENCY_UNSUCCESSFUL,
    payload
});

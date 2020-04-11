import { POLICY } from "../constants/Policy.constant";

export const storePolicy = payload => ({
    type: POLICY.STORE,
    payload
});
export const storePolicySuccessful = payload => ({
    type: POLICY.SUCCESSFUL,
    payload
});
export const storePolicyUnsuccessful = payload => ({
    type: POLICY.UNSUCCESSFUL,
    payload
});

export const resetStorePolicy = payload => ({
    type: POLICY.RESET_STORE,
    payload
});

export const getAllPolicies = payload => ({
    type: POLICY.GET_ALL,
    payload
});
export const getAllPoliciesSuccessful = payload => ({
    type: POLICY.GET_ALL_SUCCESSFUL,
    payload
});
export const getAllPoliciesUnsuccessful = payload => ({
    type: POLICY.GET_ALL_UNSUCCESSFUL,
    payload
});

export const deletePolicy = payload => ({
    type: POLICY.DELETE,
    payload
});
export const deletePolicySuccessful = payload => ({
    type: POLICY.DELETE_SUCCESSFUL,
    payload
});
export const deletePolicyUnsuccessful = payload => ({
    type: POLICY.DELETE_UNSUCCESSFUL,
    payload
});

export const getPolicy = payload => ({
    type: POLICY.GET,
    payload
});
export const getPolicySuccessful = payload => ({
    type: POLICY.GET_SUCCESSFUL,
    payload
});
export const getPolicyUnsuccessful = payload => ({
    type: POLICY.GET_UNSUCCESSFUL,
    payload
});

export const getPolicyReset = payload => ({
    type: POLICY.GET_BENEFICIARIES_RESET,
    payload
});

export const getPolicyBeneficiaries = payload => ({
    type: POLICY.GET_BENEFICIARIES,
    payload
});
export const getPolicyBeneficiariesSuccessful = payload => ({
    type: POLICY.GET_BENEFICIARIES_SUCCESSFUL,
    payload
});
export const getPolicyBeneficiariesUnsuccessful = payload => ({
    type: POLICY.GET_BENEFICIARIES_UNSUCCESSFUL,
    payload
});

export const updatePolicy = payload => ({
    type: POLICY.UPDATE,
    payload
});
export const updatePolicySuccessful = payload => ({
    type: POLICY.UPDATE_SUCCESSFUL,
    payload
});
export const updatePolicyUnsuccessful = payload => ({
    type: POLICY.UPDATE_UNSUCCESSFUL,
    payload
});

export const resetUpdatePolicy = payload => ({
    type: POLICY.RESET_UPDATE,
    payload
});

export const policyCreateDependency = payload => ({
    type: POLICY.CREATE_DEPENDENCY,
    payload
});
export const policyCreateDependencySuccessful = payload => ({
    type: POLICY.CREATE_DEPENDENCY_SUCCESSFUL,
    payload
});
export const policyCreateDependencyUnsuccessful = payload => ({
    type: POLICY.CREATE_DEPENDENCY_UNSUCCESSFUL,
    payload
});

import { CLAIM } from '../constants/Claim.constant';
import { updateObject } from '../utils/updateObject';


const claimGetAllSuccessful = (state, action) => {
    return updateObject(state, {
        meta: action.payload.meta,
        claims: action.payload.data,
        get_claims_status: action.payload.status,
    });
}
const claimGetAllUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_claims_status: action.payload.status,
    });
}


const claimGetSuccessful = (state, action) => {
    return updateObject(state, {
        claim: action.payload.data,
        get_claim_status: action.payload.status,
    });
}
const claimGetUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_claim_status: action.payload.status,
    });
}


const claimConfirmSuccessful = (state, action) => {
    let claim = action.payload.data;

    //paid, update all claims
    if (claim.status == 3) {
        let newClaims = [...state.claims].map(newClaim => {
            if (newClaim.id == claim.id) {
                return claim;
            }
            return newClaim;
        });


        return updateObject(state, {
            claims: newClaims,
            confirm_claim_status: action.payload.status,
        });
    }

    return updateObject(state, {
        claim: claim,
        confirm_claim_status: action.payload.status,
    });
}
const claimConfirmUnsuccessful = (state, action) => {
    return updateObject(state, {
        confirm_claim_status: action.payload.status,
    });
}


const claimResetConfirm = (state, action) => {
    return updateObject(state, {
        confirm_claim_status: null,
    });
}


const claimUpdateEncounterServiceSuccessful = (state, action) => {
    return updateObject(state, {
        claim: action.payload.data,
        update_encounter_service_status: action.payload.status,
    });
}
const claimUpdateEncounterServiceUnsuccessful = (state, action) => {
    return updateObject(state, {
        update_encounter_service_status: action.payload.status,
    });
}

const claimUpdateEncounterServiceReset = (state, action) => {
    return updateObject(state, {
        update_encounter_service_status: null,
    });
}

const initialState = {
    meta: null,
    claims: [],
    get_claims_status: null,

    claim: null,
    get_claim_status: null,

    confirm_claim_status: null,
    update_encounter_service_status: null
};


const reducer = (state = initialState, action) => {

    const CLAIM_GET_ALL_SUCCESSFUL = CLAIM.GET_ALL_SUCCESSFUL;
    const CLAIM_GET_ALL_UNSUCCESSFUL = CLAIM.GET_ALL_UNSUCCESSFUL;

    const CLAIM_GET_SUCCESSFUL = CLAIM.GET_SUCCESSFUL;
    const CLAIM_GET_UNSUCCESSFUL = CLAIM.GET_UNSUCCESSFUL;

    const CLAIM_CONFIRM_SUCCESSFUL = CLAIM.CONFIRM_SUCCESSFUL;
    const CLAIM_CONFIRM_UNSUCCESSFUL = CLAIM.CONFIRM_UNSUCCESSFUL;

    const CLAIM_RESET_CONFIRM = CLAIM.RESET_CONFIRM;

    const CLAIM_UPDATE_ENCOUNTER_SERVICE_SUCCESSFUL = CLAIM.UPDATE_ENCOUNTER_SERVICE_SUCCESSFUL;
    const CLAIM_UPDATE_ENCOUNTER_SERVICE_UNSUCCESSFUL = CLAIM.UPDATE_ENCOUNTER_SERVICE_UNSUCCESSFUL;

    const CLAIM_RESET_UPDATE_ENCOUNTER_SERVICE = CLAIM.RESET_UPDATE_ENCOUNTER_SERVICE;


    const lookup = {
        CLAIM_GET_ALL_SUCCESSFUL: claimGetAllSuccessful,
        CLAIM_GET_ALL_UNSUCCESSFUL: claimGetAllUnsuccessful,

        CLAIM_GET_SUCCESSFUL: claimGetSuccessful,
        CLAIM_GET_UNSUCCESSFUL: claimGetUnsuccessful,

        CLAIM_CONFIRM_SUCCESSFUL: claimConfirmSuccessful,
        CLAIM_CONFIRM_UNSUCCESSFUL: claimConfirmUnsuccessful,

        CLAIM_RESET_CONFIRM: claimResetConfirm,

        CLAIM_UPDATE_ENCOUNTER_SERVICE_SUCCESSFUL: claimUpdateEncounterServiceSuccessful,
        CLAIM_UPDATE_ENCOUNTER_SERVICE_UNSUCCESSFUL: claimUpdateEncounterServiceUnsuccessful,

        CLAIM_RESET_UPDATE_ENCOUNTER_SERVICE: claimUpdateEncounterServiceReset,
    }
    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
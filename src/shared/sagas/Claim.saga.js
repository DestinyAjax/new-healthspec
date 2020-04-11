import { CLAIM } from '../constants/Claim.constant';
import { call, put, takeEvery } from 'redux-saga/effects';
import { claimGetAll, claimGet, claimConfirm, updateEncounterService } from '../services/Claim.service';
import {
    getClaimUnsuccessful, getClaimSuccessful,
    getAllClaimsUnsuccessful, getAllClaimsSuccessful,
    confirmClaimUnsuccessful, confirmClaimSuccessful,
    updateClaimEncounterServiceSuccessful, updateClaimEncounterServiceUnsuccessful
} from '../actions/Claim.action';
import { startLoading, stopLoading } from '../actions/Loader.action';



function* handleAllClaims(action) {
    try {
        yield put(startLoading());
        const response = yield call(claimGetAll, action.payload);

        if (response.status !== 200) {
            yield put(getAllClaimsUnsuccessful(response));
        }

        yield put(getAllClaimsSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleClaim(action) {
    try {
        yield put(startLoading());
        const response = yield call(claimGet, action.payload);

        if (response.status !== 200) {
            yield put(getClaimUnsuccessful(response));
        }

        yield put(getClaimSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleClaimConfirm(action) {
    try {
        yield put(startLoading());
        const response = yield call(claimConfirm, action.payload);

        if (response.status !== 200) {
            yield put(confirmClaimUnsuccessful(response));
        }

        yield put(confirmClaimSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleUpdateClaimEncounterService(action) {
    try {
        yield put(startLoading());
        const response = yield call(updateEncounterService, action.payload);

        if (response.status !== 200) {
            yield put(updateClaimEncounterServiceUnsuccessful(response));
        }

        yield put(updateClaimEncounterServiceSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* watchClaim() {
    yield takeEvery(CLAIM.GET, handleClaim);
    yield takeEvery(CLAIM.GET_ALL, handleAllClaims);
    yield takeEvery(CLAIM.CONFIRM, handleClaimConfirm);
    yield takeEvery(CLAIM.UPDATE_ENCOUNTER_SERVICE, handleUpdateClaimEncounterService);
}

export default watchClaim;
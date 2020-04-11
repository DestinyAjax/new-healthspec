import { call, put, takeEvery } from 'redux-saga/effects';

import { REFER } from '../constants/Refer.constant';
import { getQuery, storeRefer, getRefer, updateRefer, getReferService, updateReferClaims } from '../services/Refer.service';
import { 
    getQuerySuccessful, getQueryUnsuccessful,
    storeReferUnsuccessful, storeReferSuccessful,
    getReferSuccessful, getReferUnsuccessful,
    updateReferSuccessful, updateReferUnsuccessful,
    updateReferClaimsUnsuccessful, updateReferClaimsSuccessful,
    getReferServiceSuccessful, getReferServiceUnsuccessful,
} from '../actions/Refer.action';
import { startLoading, stopLoading } from '../actions/Loader.action';

function* handleGetQuery(action) {
    try {
        yield put(startLoading());
        const response = yield call(getQuery, action.payload);

        if (response.status !== 200) {
            yield put(getQueryUnsuccessful(response));
        }

        yield put(getQuerySuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleGet(action) {
    try {
        yield put(startLoading());
        const response = yield call(getRefer, action.payload);

        if (response.status !== 200) {
            yield put(getReferUnsuccessful(response));
        }

        yield put(getReferSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleGetService(action) {
    try {
        yield put(startLoading());
        const response = yield call(getReferService, action.payload);

        if (response.status !== 200) {
            yield put(getReferServiceUnsuccessful(response));
        }

        yield put(getReferServiceSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleUpdate(action) {
    try {
        yield put(startLoading());
        const response = yield call(updateRefer, action.payload);

        if (response.status !== 200) {
            yield put(updateReferUnsuccessful(response));
        }

        yield put(updateReferSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleUpdateClaims(action) {
    try {
        yield put(startLoading());
        const response = yield call(updateReferClaims, action.payload);

        if (response.status !== 200) {
            yield put(updateReferClaimsUnsuccessful(response));
        }

        yield put(updateReferClaimsSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleStore(action) {
    try {
        yield put(startLoading());
        const response = yield call(storeRefer, action.payload);

        if (response.status !== 200) {
            yield put(storeReferUnsuccessful(response));
        }

        yield put(storeReferSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* watchRefer() {
    yield takeEvery(REFER.STORE, handleStore);
    yield takeEvery(REFER.GET_QUERY, handleGetQuery);
    yield takeEvery(REFER.GET, handleGet);
    yield takeEvery(REFER.UPDATE, handleUpdate);
    yield takeEvery(REFER.UPDATE_CLAIMS, handleUpdateClaims);
    yield takeEvery(REFER.GET_SERVICE, handleGetService);
    // yield takeEvery(ENCOUNTER.GET_ALL_FOR, handleGetAllForEncounter);
}

export default watchRefer;
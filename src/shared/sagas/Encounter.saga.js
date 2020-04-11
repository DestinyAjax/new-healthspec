import { ENCOUNTER } from '../constants/Encounter.constant';

import { call, put, takeEvery } from 'redux-saga/effects';
import { getQuery, storeEncounter, getAllFor } from '../services/Encounter.service';
import {
    getQuerySuccessful, getQueryUnsuccessful,
    getAllForSuccessful, getAllForUnsuccessful,
    storeEncounterSuccessful, storeEncounterUnsuccessful,
} from '../actions/Encounter.action';
import { startLoading, stopLoading } from '../actions/Loader.action';

function* handleGetQuery(action) {
    try {
        yield put(startLoading());
        const response = yield call(getQuery, action.payload);

        if (response.status != 200) {
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


function* handleStoreEncounter(action) {
    try {
        yield put(startLoading());
        const response = yield call(storeEncounter, action.payload);

        if (response.status != 200) {
            yield put(storeEncounterUnsuccessful(response));
        }

        yield put(storeEncounterSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleGetAllForEncounter(action) {
    try {
        yield put(startLoading());
        const response = yield call(getAllFor, action.payload);

        if (response.status != 200) {
            yield put(getAllForUnsuccessful(response));
        }

        yield put(getAllForSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* watchEncounterRequest() {
    yield takeEvery(ENCOUNTER.GET_QUERY, handleGetQuery);
    yield takeEvery(ENCOUNTER.STORE, handleStoreEncounter);
    yield takeEvery(ENCOUNTER.GET_ALL_FOR, handleGetAllForEncounter);
}

export default watchEncounterRequest;
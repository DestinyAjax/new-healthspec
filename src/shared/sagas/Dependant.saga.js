import { DEPENDANT } from '../constants/Dependant.constant';
import { call, put, takeEvery } from 'redux-saga/effects';
import { dependantStore, dependantGet } from '../services/Dependant.service';
import {
    storeDependantSuccessful, storeDependantUnsuccessful,
    getDependantsSuccessful, getDependantsUnsuccessful
} from '../actions/Dependant.action';
import { startLoading, stopLoading } from '../actions/Loader.action';

function* handleDependantCreate(action) {
    try {
        yield put(startLoading());
        const response = yield call(dependantStore, action.payload);

        if (response.status !== 200) {
            yield put(storeDependantUnsuccessful(response));
        }

        yield put(storeDependantSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleAllDependants(action) {
    try {
        yield put(startLoading());
        const response = yield call(dependantGet, action.payload);

        if (response.status !== 200) {
            yield put(getDependantsUnsuccessful(response));
        }

        yield put(getDependantsSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* watchDependantCreate() {
    yield takeEvery(DEPENDANT.STORE, handleDependantCreate);
    yield takeEvery(DEPENDANT.GET, handleAllDependants);
}

export default watchDependantCreate;
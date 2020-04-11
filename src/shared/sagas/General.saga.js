import { GENERAL } from '../constants/General.constant';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getRequest, postRequest, postRequestWithImage } from '../services/General.service';
import {
    getGeneralRegistrationSuccessful, getGeneralRegistrationUnsuccessful,
    getOrganizationSuccessful, getOrganizationUnsuccessful,
    updateOrganizationSuccessful, updateOrganizationUnsuccessful
} from '../actions/General.action';
 


function* handleGetRegistration() {
    try {
        const response = yield call(getRequest,'report/registration_summary');

        if (response.status !== 200) {
            yield put(getGeneralRegistrationUnsuccessful(response));
        }
        yield put(getGeneralRegistrationSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    }
}

function* handleGetProvider(action) {
    try {
        const response = yield call(getRequest,`${action.payload.url}`);

        if (response.status !== 200) {
            yield put(getOrganizationUnsuccessful(response));
        }
        yield put(getOrganizationSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    }
}

function* handleUpdateProfile(action) {
    try {
        const response = yield call(postRequest,`${action.payload.url}`, action.payload);

        if (response.status !== 200) {
            yield put(getOrganizationUnsuccessful(response));
        }
        yield put(getOrganizationSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    }
}




function* watchGeneralRequest() {
    yield takeEvery(GENERAL.GET_REGISTRATION, handleGetRegistration);
    yield takeEvery(GENERAL.GET_ORGANIZATION, handleGetProvider);
    yield takeEvery(GENERAL.UPDATE_ORGANIZATION,handleUpdateProfile);
}

export default watchGeneralRequest;
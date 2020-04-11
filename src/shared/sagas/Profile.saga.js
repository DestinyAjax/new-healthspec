import { PROFILE } from '../constants/Profile.constant';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getProfile, updateBasicProfile } from '../services/Profile.service';
import {
    getProfileForSuccessful, getProfileForUnsuccessful, updateBasicProfileSuccessful, updateBasicProfileUnsuccessful,
} from '../actions/Profile.action';
import { startLoading, stopLoading } from '../actions/Loader.action';

function* handleGetProfile(action) {
    try {
        yield put(startLoading());
        const response = yield call(getProfile, action.payload);

        if (response.status !== 200) {
            yield put(getProfileForUnsuccessful(response));
        }

        yield put(getProfileForSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleBasicProfileUpdate(action) {
    try {
        yield put(startLoading());
        const response = yield call(updateBasicProfile, action.payload);

        if (response.status !== 200) {
            yield put(updateBasicProfileUnsuccessful(response));
        }
        yield put(updateBasicProfileSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* watchProfile() {
    yield takeEvery(PROFILE.GET, handleGetProfile);
    yield takeEvery(PROFILE.BASIC_PROFILE_UPDATE, handleBasicProfileUpdate);

}

export default watchProfile;
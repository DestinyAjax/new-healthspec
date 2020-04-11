import { GUEST } from '../constants/Guest.constant';
import { call, put, takeEvery } from 'redux-saga/effects';
import { guestDefaultData, guestDefaultService } from '../services/Guest.service';
import { getDefaultDataSuccessful, getDefaultDataUnsuccessful, getServicesSuccessful, getServicesUnsuccessful } from '../actions/Guest.action';

function* handleGuestDefaultData(action) {
    try {
        const response = yield call(guestDefaultData, action.payload);

        if (response.status != 200) {
            yield put(getDefaultDataUnsuccessful(response));
        }

        yield put(getDefaultDataSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    }
}

function* handleGuestService(action) {
    try {
        const response = yield call(guestDefaultService, action.payload);

        if (response.status != 200) {
            yield put(getServicesUnsuccessful(response));
        }

        yield put(getServicesSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    }
}


function* watchGuestRequest() {
    yield takeEvery(GUEST.DEFAULT_DATA, handleGuestDefaultData);
    yield takeEvery(GUEST.GET_SERVICES, handleGuestService);
}

export default watchGuestRequest;
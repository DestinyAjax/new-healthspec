import { AUTH } from '../constants/Auth.constant';
import { authStart } from '../services/Auth.service';
import { call, put, takeEvery } from 'redux-saga/effects';
import { authSuccessful, authUnsuccessful } from '../actions/Auth.action';

function* handleAuthStart(action) {
    try {
        const response = yield call(authStart, action.payload);

        if (response.status != 200) {
            yield put(authUnsuccessful(response));
        }

        yield put( authSuccessful(response) );
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    }
}

function* watchAuthRequest() {
    yield takeEvery(AUTH.START, handleAuthStart);
}

export default watchAuthRequest;
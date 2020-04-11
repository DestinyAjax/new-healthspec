import { call, put, takeEvery } from 'redux-saga/effects';

import { PASSWORD } from '../constants/ChangePassword.constant';
import { changePassword  } from '../services/ChangePassword.service';
import { 
    storeChangePasswordSuccessful, storeChangePasswordUnsuccessful,
} from '../actions/ChangePassword.action';
import { startLoading, stopLoading } from '../actions/Loader.action';


function* handleStore(action) {
    try {
        yield put(startLoading());
        const response = yield call(changePassword, action.payload);

        if (response.status !== 200) {
            yield put(storeChangePasswordUnsuccessful(response));
        }

        yield put(storeChangePasswordSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* watchRefer() {
    yield takeEvery(PASSWORD.CHANGE, handleStore);
}

export default watchRefer;
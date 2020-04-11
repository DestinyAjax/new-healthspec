import { getAll } from '../services/Permission.service';
import { call, put, takeEvery } from 'redux-saga/effects';
import { PERMISSION } from '../constants/Permission.constant';
import { getAllPermissionsSuccessful, getAllPermissionsUnsuccessful } from '../actions/Permission.action';
import { startLoading, stopLoading } from '../actions/Loader.action';

function* handleGetAllPermissions(action) {
    try {
        yield put(startLoading())
        const response = yield call(getAll);

        if (response.status !== 200) {
            yield put(getAllPermissionsUnsuccessful(response));
        }

        yield put(getAllPermissionsSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* watch() {
    yield takeEvery(PERMISSION.GET_ALL, handleGetAllPermissions);
}

export default watch;
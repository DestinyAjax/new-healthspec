import { USER } from '../constants/User.constant';
import { call, put, takeEvery } from 'redux-saga/effects';
import { userStore, userGetAll, deleteUser, getDependency } from '../services/User.service';
import {
    getUsersUnsuccessful, getUsersSuccessful,
    storeUserSuccessful, storeUserUnsuccessful,
    deleteUserUnsuccessful, deleteUserSuccessful,
    getDependencySuccessful, getDependencyUnsuccessful
} from '../actions/User.action';
import { startLoading, stopLoading } from '../actions/Loader.action';

function* handleCreate(action) {
    try {
        yield put(startLoading());
        const response = yield call(userStore, action.payload);

        if (response.status !== 200) {
            yield put(storeUserUnsuccessful(response));
        }

        yield put(storeUserSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleAll(action) {
    try {
        yield put(startLoading());
        const response = yield call(userGetAll, action.payload);

        if (response.status !== 200) {
            yield put(getUsersUnsuccessful(response));
        }

        yield put(getUsersSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleDelete(action) {
    try {
        yield put(startLoading());
        const response = yield call(deleteUser, action.payload);

        if (response.status !== 200) {
            yield put(deleteUserUnsuccessful(response));
        }

        yield put(deleteUserSuccessful({
            slug: action.payload.slug
        }));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

// function* handleGetDependency(action) {
//     try {
//         const response = yield call(getDependency, action.payload);

//         if (response.status !== 200) {
//             yield put(getDependencyUnsuccessful(response));
//         }

//         yield put(getDependencySuccessful(response));
//     } catch (error) {
//         if (typeof (error) !== 'object') {
//             console.dir(error);
//         }
//     }
// }


function* watch() {
    yield takeEvery(USER.STORE, handleCreate);
    yield takeEvery(USER.GET_ALL, handleAll);
    yield takeEvery(USER.DELETE, handleDelete);
    // yield takeEvery(USER.DEPENDENCY, handleGetDependency);

}

export default watch;
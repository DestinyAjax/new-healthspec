import { ROLE } from '../constants/Role.constant';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getRole, getRoles, roleStore, roleUpdate, deleteRole } from '../services/Role.service';
import {
    storeRoleSuccessful, storeRoleUnsuccessful,
    getRolesSuccessful, getRolesUnsuccessful,
    getRoleSuccessful, getRoleUnsuccessful,
    deleteRoleSuccessful, deleteRoleUnsuccessful,
    updateRoleUnsuccessful, updateRoleSuccessful
} from '../actions/Role.action';
import { startLoading, stopLoading } from '../actions/Loader.action';

function* handleRoleCreate(action) {
    try {
        yield put(startLoading());
        const response = yield call(roleStore, action.payload);
        if (response.status !== 200) {
            yield put(storeRoleUnsuccessful(response));
        }

        yield put(storeRoleSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleGetAllRoles(action) {
    try {
        yield put(startLoading());
        const response = yield call(getRoles, action.payload);
        if (response.status !== 200) {
            yield put(getRolesUnsuccessful(response));
        }

        yield put(getRolesSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleDeleteRole(action) {
    try {
        yield put(startLoading());
        const response = yield call(deleteRole, action.payload);
        if (response.status !== 200) {
            yield put(deleteRoleUnsuccessful(response));
        }

        yield put(deleteRoleSuccessful({
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

function* handleGetRole(action) {
    try {
        yield put(startLoading());
        const response = yield call(getRole, action.payload);
        if (response.status !== 200) {
            yield put(getRoleUnsuccessful(response));
        }

        yield put(getRoleSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleRoleUpdate(action) {
    try {
        yield put(startLoading());
        const response = yield call(roleUpdate, action.payload);

        if (response.status !== 200) {
            yield put(updateRoleUnsuccessful(response));
        }

        yield put(updateRoleSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* watchRoleCreate() {
    yield takeEvery(ROLE.STORE, handleRoleCreate);
    yield takeEvery(ROLE.GET_ALL, handleGetAllRoles);
    yield takeEvery(ROLE.DELETE, handleDeleteRole);
    yield takeEvery(ROLE.GET, handleGetRole);
    yield takeEvery(ROLE.UPDATE, handleRoleUpdate);
}

export default watchRoleCreate;
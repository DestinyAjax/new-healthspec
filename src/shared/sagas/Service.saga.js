import { SERVICE } from '../constants/Service.constant';
import { call, put, takeEvery } from 'redux-saga/effects';
import { serviceStore, serviceBatchStore, serviceGetAll, deleteService, getService, serviceUpdate } from '../services/Service.service';
import { 
    storeServiceSuccessful, storeServiceUnsuccessful, storeBatchServiceSuccessful, storeBatchServiceUnsuccessful,
    getAllSuccessful, getAllUnsuccessful, deleteServiceSuccessful, deleteServiceUnsuccessful,
    getServiceUnsuccessful, getServiceSuccessful, updateServiceUnsuccessful, updateServiceSuccessful
} 
from '../actions/Service.action';
import { startLoading, stopLoading } from '../actions/Loader.action';

function* handleServiceCreate(action) {
    try {
        yield put(startLoading());
        const response = yield call(serviceStore, action.payload);

        if (response.status !== 200) {
            yield put(storeServiceUnsuccessful(response));
        }

        yield put(storeServiceSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleBatchServiceCreate(action) {
    try {
        yield put(startLoading());
        const response = yield call(serviceBatchStore, action.payload);

        if (response.status !== 200) {
            yield put(storeBatchServiceSuccessful(response));
        }

        yield put(storeBatchServiceUnsuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleAllServices(action) {
    try {
        yield put(startLoading());
        const response = yield call(serviceGetAll, action.payload);

        if (response.status !== 200) {
            yield put(getAllUnsuccessful(response));
        }

        yield put(getAllSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleDeleteService(action) {
    try {
        yield put(startLoading());
        const response = yield call(deleteService, action.payload);

        if (response.status !== 200) {
            yield put(deleteServiceUnsuccessful(response));
        }

        yield put(deleteServiceSuccessful({
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


function* handleGetService(action) {
    try {
        yield put(startLoading());
        const response = yield call(getService, action.payload);

        if (response.status !== 200) {
            yield put(getServiceUnsuccessful(response));
        }

        yield put(getServiceSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleServiceUpdate(action) {
    try {
        yield put(startLoading());
        const response = yield call(serviceUpdate, action.payload);

        if (response.status !== 200) {
            yield put(updateServiceUnsuccessful(response));
        }

        yield put(updateServiceSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* watchService() {
    yield takeEvery(SERVICE.STORE, handleServiceCreate);
    yield takeEvery(SERVICE.STORE_BATCH, handleBatchServiceCreate);
    yield takeEvery(SERVICE.GET_ALL, handleAllServices);
    yield takeEvery(SERVICE.DELETE, handleDeleteService);
    yield takeEvery(SERVICE.GET, handleGetService);
    yield takeEvery(SERVICE.UPDATE, handleServiceUpdate);
}

export default watchService;
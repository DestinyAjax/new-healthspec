import { call, put, takeEvery } from 'redux-saga/effects';
import { PLAN_SERVICE } from '../constants/PlanService.constant';
import {
    planServiceStore, planServiceBatchStore,
    planServiceGetAll, deletePlanService,
    getPlanService, planServiceUpdate,
    planServiceDependencies
} from '../services/PlanService.service';
import {
    getAllSuccessful, getAllUnsuccessful,

    storePlanServiceSuccessful, storePlanServiceUnsuccessful,
    storeBatchPlanServiceSuccessful, storeBatchPlanServiceUnsuccessful,

    deletePlanServiceSuccessful, deletePlanServiceUnsuccessful,
    getPlanServiceUnsuccessful, getPlanServiceSuccessful,

    updatePlanServiceUnsuccessful, updatePlanServiceSuccessful,
    getDependenciesSuccessful, getDependenciesUnsuccessful
} from '../actions/PlanService.action';
import { startLoading, stopLoading } from '../actions/Loader.action';


function* handleAllPlanServices(action) {
    try {
        yield put(startLoading());
        const response = yield call(planServiceGetAll);

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



function* handleBatchPlanServiceCreate(action) {
    try {
        yield put(startLoading());
        const response = yield call(planServiceBatchStore, action.payload);

        if (response.status !== 200) {
            yield put(storeBatchPlanServiceUnsuccessful(response));
        }

        yield put(storeBatchPlanServiceSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handlePlanServiceCreate(action) {
    try {
        yield put(startLoading());
        const response = yield call(planServiceStore, action.payload);

        if (response.status !== 200) {
            yield put(storePlanServiceUnsuccessful(response));
        }

        yield put(storePlanServiceSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleDeletePlanService(action) {
    try {
        yield put(startLoading());
        const response = yield call(deletePlanService, action.payload);

        if (response.status !== 200) {
            yield put(deletePlanServiceUnsuccessful(response));
        }

        yield put(deletePlanServiceSuccessful({
            plan_service_id: action.payload.plan_service_id
        }));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleGetPlanService(action) {
    try {
        yield put(startLoading());
        const response = yield call(getPlanService, action.payload);

        if (response.status !== 200) {
            yield put(getPlanServiceUnsuccessful(response));
        }

        yield put(getPlanServiceSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handlePlanServiceUpdate(action) {
    try {
        yield put(startLoading());
        const response = yield call(planServiceUpdate, action.payload);

        if (response.status !== 200) {
            yield put(updatePlanServiceUnsuccessful(response));
        }

        yield put(updatePlanServiceSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleGetDependencies(action) {
    try {
        yield put(startLoading());
        const response = yield call(planServiceDependencies, action.payload);

        if (response.status !== 200) {
            yield put(getDependenciesUnsuccessful(response));
        }

        yield put(getDependenciesSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* watchService() {
    yield takeEvery(PLAN_SERVICE.STORE_BATCH, handleBatchPlanServiceCreate);
    yield takeEvery(PLAN_SERVICE.STORE, handlePlanServiceCreate);
    yield takeEvery(PLAN_SERVICE.GET_ALL, handleAllPlanServices);
    yield takeEvery(PLAN_SERVICE.DELETE, handleDeletePlanService);
    yield takeEvery(PLAN_SERVICE.GET, handleGetPlanService);

    yield takeEvery(PLAN_SERVICE.UPDATE, handlePlanServiceUpdate);
    yield takeEvery(PLAN_SERVICE.GET_DEPENDENCY, handleGetDependencies);
}

export default watchService;
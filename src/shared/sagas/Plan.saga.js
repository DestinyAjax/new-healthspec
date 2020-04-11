import { PLAN } from '../constants/Plan.constant';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getPlan, getPlans, planStore, planUpdate, deletePlan } from '../services/Plan.service';
import {
    storePlanSuccessful, storePlanUnsuccessful,
    getPlansSuccessful, getPlansUnsuccessful,
    getPlanSuccessful, getPlanUnsuccessful,
    deletePlanSuccessful, deletePlanUnsuccessful,
    updatePlanUnsuccessful, updatePlanSuccessful
} from '../actions/Plan.action';
import { startLoading, stopLoading } from '../actions/Loader.action';

function* handlePlanCreate(action) {
    try {
        yield put(startLoading());
        const response = yield call(planStore, action.payload);
        if (response.status !== 200) {
            yield put(storePlanUnsuccessful(response));
        }

        yield put(storePlanSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleGetAllPlans(action) {
    try {
        yield put(startLoading());
        const response = yield call(getPlans, action.payload);
        if (response.status !== 200) {
            yield put(getPlansUnsuccessful(response));
        }

        yield put(getPlansSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleDeletePlan(action) {
    try {
        yield put(startLoading());
        const response = yield call(deletePlan, action.payload);
        if (response.status !== 200) {
            yield put(deletePlanUnsuccessful(response));
        }

        yield put(deletePlanSuccessful({
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

function* handleGetPlan(action) {
    try {
        yield put(startLoading());
        const response = yield call(getPlan, action.payload);
        if (response.status !== 200) {
            yield put(getPlanUnsuccessful(response));
        }

        yield put(getPlanSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handlePlanUpdate(action) {
    try {
        yield put(startLoading());
        const response = yield call(planUpdate, action.payload);

        if (response.status !== 200) {
            yield put(updatePlanUnsuccessful(response));
        }

        yield put(updatePlanSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* watchPlanCreate() {
    yield takeEvery(PLAN.STORE, handlePlanCreate);
    yield takeEvery(PLAN.GET_ALL, handleGetAllPlans);
    yield takeEvery(PLAN.DELETE, handleDeletePlan);
    yield takeEvery(PLAN.GET, handleGetPlan);
    yield takeEvery(PLAN.UPDATE, handlePlanUpdate);
}

export default watchPlanCreate;
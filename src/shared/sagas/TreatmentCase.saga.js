import { TREATMENT_CASE } from "../constants/TreatmentCase.constant";
import { call, put, takeEvery } from "redux-saga/effects";
import { treatmentCaseStore, getTreatment as getSingleTreatment, treatmentUpdate } from "../services/TreatmentCase.service";
import {
    storeTreatmentSuccessful,
    storeTreatmentUnsuccessful,
    getTreatmentSuccessful,
    getTreatmentUnsuccessful,
    updateTreatmentSuccessful,
    updateTreatmentUnsuccessful
} from "../actions/TreatmentCase.action";
import { startLoading, stopLoading } from '../actions/Loader.action';

function* handleTreatmentCreate(action) {
    try {
        yield put(startLoading());
        const response = yield call(treatmentCaseStore, action.payload);
        if (response.status !== 200) {
            yield put(storeTreatmentUnsuccessful(response));
        }

        yield put(storeTreatmentSuccessful(response));
    } catch (error) {
        if (typeof error !== "object") {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleGetTreatment(action) {
    try {
        yield put(startLoading());
        const response = yield call(getSingleTreatment, action.payload);

        if (response.status !== 200) {
            yield put(getTreatmentUnsuccessful(response));
        }

        yield put(getTreatmentSuccessful(response));
    } catch (error) {
        if (typeof error !== "object") {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleTreatmentUpdate(action) {
    try {
        yield put(startLoading());
        const response = yield call(treatmentUpdate, action.payload);

        if (response.status !== 200) {
            yield put(updateTreatmentUnsuccessful(response));
        }

        yield put(updateTreatmentSuccessful(response));
    } catch (error) {
        if (typeof error !== "object") {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* watchPlanCreate() {
    yield takeEvery(TREATMENT_CASE.STORE, handleTreatmentCreate);
    yield takeEvery(TREATMENT_CASE.GET, handleGetTreatment);
    yield takeEvery(TREATMENT_CASE.UPDATE, handleTreatmentUpdate);
}

export default watchPlanCreate;

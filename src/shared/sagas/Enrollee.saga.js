import { call, put, takeEvery } from "redux-saga/effects";
import { ENROLLEE } from "../constants/Enrollee.constant";
import { getProviderEnrollee } from "../services/Enrollee.service";
import { getEnrolleeSuccessful, getEnrolleeUnsuccessful } from "../actions/Enrollee.action";
import { startLoading, stopLoading } from '../actions/Loader.action';

// function* handleAllProviderEnrollees(action) {
//     try {
//         const response = yield call(beneficiaryGetAll, action.payload);

//         if (response.status !== 200) {
//             yield put(getEnrolleesUnsuccessful(response));
//         }

//         yield put(getEnrolleesSuccessful(response));
//     } catch (error) {
//         if (typeof (error) !== 'object') {
//             console.dir(error);
//         }
//     }
// }

function* handleGetEnrollee(action) {
    try {
        yield put(startLoading());
        const response = yield call(getProviderEnrollee, action.payload);

        if (response.status !== 200) {
            yield put(getEnrolleeUnsuccessful(response));
        }

        yield put(getEnrolleeSuccessful(response));
    } catch (error) {
        if (typeof error !== "object") {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* watchEnrollees() {
    yield takeEvery(ENROLLEE.GET, handleGetEnrollee);
    // yield takeEvery(ENROLLEE.GET_ALL, handleAllEnrollees);
}

export default watchEnrollees;

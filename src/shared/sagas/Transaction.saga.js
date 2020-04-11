import { call, put, takeEvery } from 'redux-saga/effects';
import { TRANSACTION } from '../constants/Transaction.constant';
import {
    getTransaction, updateTransaction, getTransactionForUser, confirmOnlinePayment, getUserTransaction
} from '../services/Transaction.service';
import {
    getSuccessful, getUnsuccessful, updateSuccessful,
    updateUnsuccessful, getAllForUserSuccessful, getAllForUserUnsuccessful,
    startConfirmOnlinePaymentSuccessful, startConfirmOnlinePaymentUnsuccessful,
    getUserTransactionsSuccessful, getUserTransactionsUnsuccessful,
} from '../actions/Transaction.action';
import { startLoading, stopLoading } from '../actions/Loader.action';

function* handleGetTransactionForUser(action) {

    try {
        yield put(startLoading());
        const response = yield call(getTransactionForUser, action.payload);

        if (response.status != 200) {
            return yield put(getAllForUserUnsuccessful(response));
        }

        yield put(getAllForUserSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleGetTransaction(action) {


    try {
        const response = yield call(getTransaction, action.payload);

        if (response.status != 200) {
            return yield put(getUnsuccessful(response));
        }

        yield put(getSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    }
}


function* handleUpdateTransaction(action) {
    try {
        yield put(startLoading());
        const response = yield call(updateTransaction, action.payload);

        if (response.status != 200) {
            return yield put(updateUnsuccessful(response));
        }

        yield put(updateSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleConfirmOnlinePayment(action) {
    try {
        yield put(startLoading());
        const response = yield call(confirmOnlinePayment, action.payload);

        if (response.status != 200) {
            return yield put(startConfirmOnlinePaymentUnsuccessful(response));
        }

        yield put(startConfirmOnlinePaymentSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleGetUserTransaction(action) {
    try {
        yield put(startLoading());
        const response = yield call(getUserTransaction, action.payload);

        if (response.status !== 200) {
            return yield put(getUserTransactionsUnsuccessful(response));
        }

        yield put(getUserTransactionsSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* watchAuthRequest() {
    yield takeEvery(TRANSACTION.GET, handleGetTransaction);
    yield takeEvery(TRANSACTION.UPDATE, handleUpdateTransaction);
    yield takeEvery(TRANSACTION.GET_USER, handleGetUserTransaction);
    yield takeEvery(TRANSACTION.GET_FOR_USER, handleGetTransactionForUser);
    yield takeEvery(TRANSACTION.CONFIRM_ONLINE_PAYMENT, handleConfirmOnlinePayment);
}

export default watchAuthRequest;
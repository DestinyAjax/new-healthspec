import { INVOICE } from '../constants/Invoice.constant';
import { call, put, takeEvery } from 'redux-saga/effects';

import { confirmOnlinePayment } from '../services/Invoice.service';
import { startConfirmOnlinePaymentSuccessful, startConfirmOnlinePaymentUnsuccessful } from '../actions/Invoice.action';
import { startLoading, stopLoading } from '../actions/Loader.action';

function* handleConfirmOnlinePayment(action) {
    try {
        yield put(startLoading());
        const response = yield call(confirmOnlinePayment, action.payload);

        if (response.status != 200) {
            yield put(startConfirmOnlinePaymentUnsuccessful(response));
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

function* watchInvoiceRequest() {
    yield takeEvery(INVOICE.CONFIRM_ONLINE_PAYMENT, handleConfirmOnlinePayment);
}

export default watchInvoiceRequest;
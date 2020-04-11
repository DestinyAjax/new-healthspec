import { updateObject } from '../utils/updateObject';
import { INVOICE } from '../constants/Invoice.constant';


const confirmOnlinePaymentWasSuccessFul = (state, action) => {
    return updateObject(state, {
        transaction: action.payload.data,
        online_payment_status: action.payload.status,
    });
}


const confirmOnlinePaymentWasUnSuccessFul = (state, action) => {
    return updateObject(state, {
        online_payment_status: 422,
    });
}


const initialState = {
    transaction: null,
    online_payment_status: null,
};


const reducer = (state = initialState, action) => {
    const INVOICE_CONFIRM_ONLINE_PAYMENT_SUCCESSFUL = INVOICE.CONFIRM_ONLINE_PAYMENT_SUCCESSFUL;
    const INVOICE_CONFIRM_ONLINE_PAYMENT_UNSUCCESSFUL = INVOICE.CONFIRM_ONLINE_PAYMENT_UNSUCCESSFUL;

    const lookup = {
        INVOICE_CONFIRM_ONLINE_PAYMENT_SUCCESSFUL: confirmOnlinePaymentWasSuccessFul,
        INVOICE_CONFIRM_ONLINE_PAYMENT_UNSUCCESSFUL: confirmOnlinePaymentWasUnSuccessFul
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
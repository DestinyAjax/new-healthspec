import { TRANSACTION } from '../constants/Transaction.constant';
import { updateObject } from '../utils/updateObject';


const transactionGetSuccessful = (state, action) => {

    return updateObject(state, {
        transaction: action.payload.data,
        get_single_transaction_status: action.payload.status,
        get_transaction_message: action.payload.message,
    });

}
const transactionGetUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_single_transaction_status: action.payload.status,
        get_transaction_message: action.payload.message,
    });
}



const transactionGetReset = (state, action) => {
    return updateObject(state, {
        get_single_transaction_status: null,
        get_transaction_message: null,
    });
}



const transactionUpdateSuccessFul = (state, action) => {
    return updateObject(state, {
        model: action.payload.data.model,
        transaction: action.payload.data.transaction,
        update_transaction_status: action.payload.status,
        update_transaction_message: action.payload.message,
    });
}
const transactionUpdateUnSuccessFul = (state, action) => {
    return updateObject(state, {
        update_transaction_status: action.payload.status,
        update_transaction_message: action.payload.message,
    });
}


const transactionGetForUserSuccessFul = (state, action) => {
    return updateObject(state, {
        transactions: action.payload.data,
        get_transactions_status: action.payload.status,
        get_transactions_message: action.payload.message,
    });
}
const transactionGetForUserUnSuccessFul = (state, action) => {
    return updateObject(state, {
        get_transactions_status: action.payload.status,
        get_transaction_message: action.payload.message,
    });
}


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



const transactionGetUserSuccessFul = (state, action) => {
    return updateObject(state, {
        transactions: action.payload.data,
        transaction_get_user_status: action.payload.status,
    });
}
const transactionGetUserUnsuccessFul = (state, action) => {
    return updateObject(state, {
        get_transaction_message: action.payload.message,
        transaction_get_user_status: action.payload.status,
    });
}



const resetTransactionGetUser = (state, action) => {
    return updateObject(state, {
        get_transactions_status: null,
        transaction_get_user_status: null,
    });
}


const resetTransactionConfirm = (state, action) => {
    return updateObject(state, {
        online_payment_status: null,
    });
}


const setTransaction = (state, action) => {
    return updateObject(state, {
        get_transaction_status: 200,
        transaction: action.payload,
    });
}


const initialState = {
    model: null,

    transaction: null,
    get_single_transaction_status: null,
    get_transaction_message: null,

    update_transaction_status: null,
    update_transaction_message: null,

    transactions: null,
    get_transactions_status: null,
    get_transactions_message: null,

    online_payment_status: null,
    transaction_get_user_status: null
};


const reducer = (state = initialState, action) => {
    const lookup = {
        [TRANSACTION.GET_SUCCESSFUL]: transactionGetSuccessful,
        [TRANSACTION.GET_UNSUCCESSFUL]: transactionGetUnsuccessful,

        [TRANSACTION.RESET_GET]: transactionGetReset,

        [TRANSACTION.UPDATE_SUCCESSFUL]: transactionUpdateSuccessFul,
        [TRANSACTION.UPDATE_UNSUCCESSFUL]: transactionUpdateUnSuccessFul,

        // [TRANSACTION.GET_FOR_USER_SUCCESSFUL]: transactionGetUserSuccessFul,
        // [TRANSACTION.GET_FOR_USER_UNSUCCESSFUL]: transactionGetUserUnsuccessFul,
        // [RESET_GET_FOR_USER_UNSUCCESSFUL]: transactionResetGetUserSuccessFul,


        [TRANSACTION.GET_FOR_USER_SUCCESSFUL]: transactionGetForUserSuccessFul,
        [TRANSACTION.GET_FOR_USER_UNSUCCESSFUL]: transactionGetForUserUnSuccessFul,

        [TRANSACTION.CONFIRM_ONLINE_PAYMENT_SUCCESSFUL]: confirmOnlinePaymentWasSuccessFul,
        [TRANSACTION.CONFIRM_ONLINE_PAYMENT_UNSUCCESSFUL]: confirmOnlinePaymentWasUnSuccessFul,

        [TRANSACTION.SET]: setTransaction,
        [TRANSACTION.GET_USER_RESET]: resetTransactionGetUser,
        [TRANSACTION.RESET_CONFIRM]: resetTransactionConfirm,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
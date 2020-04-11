import { call, put, takeEvery } from 'redux-saga/effects';
import { BENEFICIARY } from '../constants/Beneficiary.constant';
import {
    beneficiaryStore, beneficiaryBatchStore, beneficiaryGetAll,
    deleteBeneficiary, beneficiaryCreateGetDependencies, beneficiaryGet,
    beneficiaryUpdate
} from '../services/Beneficiary.service';
import {
    storeBeneficiarySuccessful, storeBeneficiaryUnsuccessful,
    storeBatchBeneficiarySuccessful, storeBatchBeneficiaryUnsuccessful,
    getBeneficiariesUnsuccessful, getBeneficiariesSuccessful,
    deleteBeneficiaryUnsuccessful, deleteBeneficiarySuccessful,
    beneficiaryCreateDependencyUnsuccessful, beneficiaryCreateDependencySuccessful,
    getBeneficiarySuccessful, getBeneficiaryUnsuccessful,
    updateBeneficiarySuccessful, updateBeneficiaryUnsuccessful
} from '../actions/Beneficiary.action';
import { startLoading, stopLoading } from '../actions/Loader.action';


function* handleBeneficiaryCreate(action) {
    try {
        yield put(startLoading());
        const response = yield call(beneficiaryStore, action.payload);

        if (response.status !== 200) {
            yield put(storeBeneficiaryUnsuccessful(response));
        }

        yield put(storeBeneficiarySuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleBatchBeneficiaryCreate(action) {
    try {
        yield put(startLoading());
        const response = yield call(beneficiaryBatchStore, action.payload);

        if (response.status !== 200) {
            yield put(storeBatchBeneficiarySuccessful(response));
        }

        yield put(storeBatchBeneficiaryUnsuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleAllBeneficiaries(action) {
    try {
        yield put(startLoading());
        const response = yield call(beneficiaryGetAll, action.payload);

        if (response.status !== 200) {
            yield put(getBeneficiariesUnsuccessful(response));
        }

        yield put(getBeneficiariesSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleDeleteBeneficiary(action) {
    try {
        yield put(startLoading());
        const response = yield call(deleteBeneficiary, action.payload);

        if (response.status !== 200) {
            yield put(deleteBeneficiaryUnsuccessful(response));
        }

        yield put(deleteBeneficiarySuccessful({
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


function* handleBeneficiaryCreateDependency(action) {
    try {
        yield put(startLoading());
        const response = yield call(beneficiaryCreateGetDependencies, action.payload);

        if (response.status !== 200) {
            yield put(beneficiaryCreateDependencyUnsuccessful(response));
        }

        yield put(beneficiaryCreateDependencySuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleGetBeneficiary(action) {
    try {
        yield put(startLoading());
        const response = yield call(beneficiaryGet, action.payload);

        if (response.status !== 200) {
            yield put(getBeneficiaryUnsuccessful(response));
        }

        yield put(getBeneficiarySuccessful(response));

    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleUpdateBeneficiary(action) {
    try {
        yield put(startLoading());
        const response = yield call(beneficiaryUpdate, action.payload);

        if (response.status !== 200) {
            yield put(updateBeneficiaryUnsuccessful(response));
        }

        yield put(updateBeneficiarySuccessful(response));

    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* watchBeneficiaryCreate() {
    yield takeEvery(BENEFICIARY.GET, handleGetBeneficiary);
    yield takeEvery(BENEFICIARY.STORE, handleBeneficiaryCreate);
    yield takeEvery(BENEFICIARY.GET_ALL, handleAllBeneficiaries);
    yield takeEvery(BENEFICIARY.DELETE, handleDeleteBeneficiary);
    yield takeEvery(BENEFICIARY.UPDATE, handleUpdateBeneficiary);
    yield takeEvery(BENEFICIARY.STORE_BATCH, handleBatchBeneficiaryCreate);
    yield takeEvery(BENEFICIARY.CREATE_DEPENDENCY, handleBeneficiaryCreateDependency);
}

export default watchBeneficiaryCreate;
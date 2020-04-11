import { POLICY } from '../constants/Policy.constant';
import { call, put, takeEvery } from 'redux-saga/effects';
import { policyStore, policyGetAll, deletePolicy, getPolicy, policyUpdate, policyCreateGetDependencies } from '../services/Policy.service';
import {
    storePolicySuccessful, storePolicyUnsuccessful,
    getAllPoliciesUnsuccessful, getAllPoliciesSuccessful,
    deletePolicyUnsuccessful, deletePolicySuccessful,
    getPolicyUnsuccessful, getPolicySuccessful,
    updatePolicyUnsuccessful, updatePolicySuccessful,
    policyCreateDependencySuccessful,
    policyCreateDependencyUnsuccessful,
    getPolicyBeneficiariesSuccessful,
    getPolicyBeneficiariesUnsuccessful
} from '../actions/Policy.action';
import { startLoading, stopLoading } from '../actions/Loader.action';


function* handlePolicyCreate(action) {
    try {
        yield put(startLoading());
        const response = yield call(policyStore, action.payload);

        if (response.status !== 200) {
            yield put(storePolicyUnsuccessful(response));
        }

        yield put(storePolicySuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}



function* handleAllPolicies(action) {
    try {
        yield put(startLoading());
        const response = yield call(policyGetAll, action.payload);

        if (response.status !== 200) {
            yield put(getAllPoliciesUnsuccessful(response));
        }

        yield put(getAllPoliciesSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handlePolicyBeneficiariesPolicy(action) {
    try {
        yield put(startLoading());
        const response = yield call(policyGetAll, action.payload);

        if (response.status !== 200) {
            yield put(getAllPoliciesUnsuccessful(response));
        }

        yield put(getAllPoliciesSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleDeletePolicy(action) {
    try {
        yield put(startLoading());
        const response = yield call(deletePolicy, action.payload);

        if (response.status !== 200) {
            yield put(deletePolicyUnsuccessful(response));
        }

        yield put(deletePolicySuccessful({
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


function* handleGetPolicy(action) {
    try {
        yield put(startLoading());
        const response = yield call(getPolicy, action.payload);

        if (response.status !== 200) {
            yield put(getPolicyUnsuccessful(response));
        }

        yield put(getPolicySuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handlePolicyUpdate(action) {
    try {
        yield put(startLoading());
        const response = yield call(policyUpdate, action.payload);

        if (response.status !== 200) {
            yield put(updatePolicyUnsuccessful(response));
        }

        yield put(updatePolicySuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handlePolicyCreateDependency(action) {
    try {
        yield put(startLoading());
        const response = yield call(policyCreateGetDependencies, action.payload);

        if (response.status !== 200) {
            yield put(policyCreateDependencyUnsuccessful(response));
        }

        yield put(policyCreateDependencySuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* watchPolicyCreate() {
    yield takeEvery(POLICY.STORE, handlePolicyCreate);
    yield takeEvery(POLICY.GET_ALL, handleAllPolicies);
    yield takeEvery(POLICY.DELETE, handleDeletePolicy);
    yield takeEvery(POLICY.GET, handleGetPolicy);
    yield takeEvery(POLICY.UPDATE, handlePolicyUpdate);
    yield takeEvery(POLICY.CREATE_DEPENDENCY, handlePolicyCreateDependency);
}

export default watchPolicyCreate;
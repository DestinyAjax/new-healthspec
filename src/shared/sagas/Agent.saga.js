import { AGENT } from '../constants/Agent.constant';
import { call, put, takeLatest } from 'redux-saga/effects';
import { agentStore, agentBatchStore, agentGetAll, deleteAgent, getBeneficiaries } from '../services/Agent.service';
import {
    storeAgentSuccessful, storeAgentUnsuccessful, storeBatchAgentSuccessful, storeBatchAgentUnsuccessful,
    getAgentsUnsuccessful, getAgentsSuccessful, deleteAgentUnsuccessful, deleteAgentSuccessful,
    getBeneficiariesSuccessful, getBeneficiariesUnsuccessful
} from '../actions/Agent.action';
import { startLoading, stopLoading } from '../actions/Loader.action';

function* handleAgentCreate(action) {
    try {
        yield put(startLoading());
        const response = yield call(agentStore, action.payload);

        if (response.status !== 200) {
            yield put(storeAgentUnsuccessful(response));
        }

        yield put(storeAgentSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleBatchAgentCreate(action) {
    yield put(startLoading());
    try {
        const response = yield call(agentBatchStore, action.payload);

        if (response.status !== 200) {
            yield put(storeBatchAgentSuccessful(response));
        }

        yield put(storeBatchAgentUnsuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleAllAgents(action) {
    try {
        yield put(startLoading());
        const response = yield call(agentGetAll, action.payload);

        if (response.status !== 200) {
            yield put(getAgentsUnsuccessful(response));
        }

        yield put(getAgentsSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleDeleteAgent(action) {
    try {
        yield put(startLoading());
        const response = yield call(deleteAgent, action.payload);

        if (response.status !== 200) {
            yield put(deleteAgentUnsuccessful(response));
        }

        yield put(deleteAgentSuccessful({
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

function* handleGetAgentBeneficiaries(action) {
    try {
        yield put(startLoading());
        const response = yield call(getBeneficiaries, action.payload);

        if (response.status !== 200) {
            yield put(getBeneficiariesUnsuccessful(response));
        }

        console.dir(response);

        yield put( getBeneficiariesSuccessful(response) );
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* watchAgentCreate() {
    yield takeLatest(AGENT.STORE, handleAgentCreate);
    yield takeLatest(AGENT.STORE_BATCH, handleBatchAgentCreate);
    yield takeLatest(AGENT.GET_ALL, handleAllAgents);
    yield takeLatest(AGENT.DELETE, handleDeleteAgent);
    yield takeLatest(AGENT.GET_ALL_BENEFICIARY, handleGetAgentBeneficiaries);

}

export default watchAgentCreate;
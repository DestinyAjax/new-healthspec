import { call, put, takeEvery } from 'redux-saga/effects';
import { ORGANIZATION_PROFILE } from '../constants/OrganizationProfile.constant';

import {
    getAllTypes, getProviderBeneficiary,
    getCompanyBeneficiary, deleteProfile,
    getDependency
} from '../services/OrganizationProfile.service';

import {
    getAllTypeSuccessful, getAllTypeUnsuccessful,
    getCompanyBeneficiarySuccessful, getCompanyBeneficiaryUnsuccessful,
    getProviderBeneficiarySuccessful, getProviderBeneficiaryUnsuccessful, deleteOrganizationProfile,
    deleteOrganizationProfileSuccessful, deleteOrganizationProfileUnsuccessful
} from '../actions/OrganizationProfile.action';

import { organizationProfileStore, organizationProfileBatchStore } from '../services/OrganizationProfileAdd.service';

import {
    storeOrganizationProfileSuccessful, storeOrganizationProfileUnsuccessful,
    storeBatchOrganizationProfileSuccessful, storeBatchOrganizationProfileUnsuccessful,
    getDependencySuccessful, getDependencyUnsuccessful
} from '../actions/OrganizationProfileAdd.action';
import { startLoading, stopLoading } from '../actions/Loader.action';


function* handleStoreOrganizationProfile(action) {
    try {
        yield put(startLoading());
        const response = yield call(organizationProfileStore, action.payload);

        if (response.status !== 200) {
            yield put(storeOrganizationProfileUnsuccessful(response));
        }

        yield put(storeOrganizationProfileSuccessful(response));
        return;
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleGetAllTypes(action) {
    try {
        yield put(startLoading());
        const response = yield call(getAllTypes, action.payload);

        if (response.status !== 200) {
            yield put(getAllTypeUnsuccessful(response));
        }

        yield put(getAllTypeSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleBatchOrganizationProfileCreate(action) {
    try {
        yield put(startLoading());
        const response = yield call(organizationProfileBatchStore, action.payload);

        if (response.status !== 200) {
            yield put(storeBatchOrganizationProfileSuccessful(response));
        }

        yield put(storeBatchOrganizationProfileUnsuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleProviderBeneficiary(action) {
    try {
        yield put(startLoading());
        const response = yield call(getProviderBeneficiary, action.payload);

        if (response.status !== 200) {
            yield put(getProviderBeneficiaryUnsuccessful(response));
        }

        yield put(getProviderBeneficiarySuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleCompanyBeneficiary(action) {
    try {
        yield put(startLoading());
        const response = yield call(getCompanyBeneficiary, action.payload);

        if (response.status !== 200) {
            yield put(getCompanyBeneficiaryUnsuccessful(response));
        }

        yield put(getCompanyBeneficiarySuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleDeleteOrganizationProfile(action) {
    try {
        yield put(startLoading());
        const response = yield call(deleteProfile, action.payload);

        if (response.status !== 200) {
            yield put(deleteOrganizationProfileUnsuccessful(response));
        }

        yield put(deleteOrganizationProfileSuccessful({
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


function* handleGetOrganizationProfileDependency(action) {
    try {
        yield put(startLoading());
        const response = yield call(getDependency, action.payload);

        if (response.status !== 200) {
            yield put(getDependencyUnsuccessful());
        }

        yield put(getDependencySuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* watchOrganizationProfileAction() {
    yield takeEvery(ORGANIZATION_PROFILE.STORE, handleStoreOrganizationProfile);
    yield takeEvery(ORGANIZATION_PROFILE.GET_ALL_TYPE, handleGetAllTypes);
    yield takeEvery(ORGANIZATION_PROFILE.STORE_BATCH, handleBatchOrganizationProfileCreate);
    yield takeEvery(ORGANIZATION_PROFILE.PROVIDER_BENEFICIARY, handleProviderBeneficiary);
    yield takeEvery(ORGANIZATION_PROFILE.COMPANY_BENEFICIARY, handleCompanyBeneficiary);
    yield takeEvery(ORGANIZATION_PROFILE.DELETE, handleDeleteOrganizationProfile);
    yield takeEvery(ORGANIZATION_PROFILE.GET_DEPENDENCY, handleGetOrganizationProfileDependency);
}

export default watchOrganizationProfileAction;
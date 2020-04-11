import { QUESTION } from '../constants/Question.constant';
import { call, put, takeEvery } from 'redux-saga/effects';
import { questionStore, questionGetAll, deleteQuestion, getQuestion, questionUpdate } from '../services/Question.service';
import {
    storeQuestionSuccessful, storeQuestionUnsuccessful,
    getAllQuestionsUnsuccessful, getAllQuestionsSuccessful,
    deleteQuestionUnsuccessful, deleteQuestionSuccessful,
    getQuestionUnsuccessful, getQuestionSuccessful,
    updateQuestionUnsuccessful, updateQuestionSuccessful,
} from '../actions/Question.action';
import { startLoading, stopLoading } from '../actions/Loader.action';


function* handleQuestionCreate(action) {
    try {
        yield put(startLoading());
        const response = yield call(questionStore, action.payload);

        if (response.status !== 200) {
            yield put(storeQuestionUnsuccessful(response));
        }

        yield put(storeQuestionSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleAllQuestions(action) {
    try {
        yield put(startLoading());
        const response = yield call(questionGetAll, action.payload);

        if (response.status !== 200) {
            yield put(getAllQuestionsUnsuccessful(response));
        }

        yield put(getAllQuestionsSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* handleDeleteQuestion(action) {
    try {
        yield put(startLoading());
        const response = yield call(deleteQuestion, action.payload);

        if (response.status !== 200) {
            yield put(deleteQuestionUnsuccessful(response));
        }

        yield put(deleteQuestionSuccessful({
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


function* handleGetQuestion(action) {
    try {
        yield put(startLoading());
        const response = yield call(getQuestion, action.payload);

        if (response.status !== 200) {
            yield put(getQuestionUnsuccessful(response));
        }

        yield put(getQuestionSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}

function* handleQuestionUpdate(action) {
    try {
        yield put(startLoading());
        const response = yield call(questionUpdate, action.payload);

        if (response.status !== 200) {
            yield put(updateQuestionUnsuccessful(response));
        }

        yield put(updateQuestionSuccessful(response));
    } catch (error) {
        if (typeof (error) !== 'object') {
            console.dir(error);
        }
    } finally {
        yield put(stopLoading());
    }
}


function* watchQuestion() {
    yield takeEvery(QUESTION.STORE, handleQuestionCreate);
    yield takeEvery(QUESTION.GET_ALL, handleAllQuestions);
    yield takeEvery(QUESTION.DELETE, handleDeleteQuestion);
    yield takeEvery(QUESTION.GET, handleGetQuestion);
    yield takeEvery(QUESTION.UPDATE, handleQuestionUpdate);
}

export default watchQuestion;
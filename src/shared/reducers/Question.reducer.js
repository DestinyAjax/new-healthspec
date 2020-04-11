import { updateObject } from '../utils/updateObject';
import { QUESTION } from '../constants/Question.constant';


const questionStoreSuccessFul = (state, action) => {
    return updateObject(state, {
        question: action.payload.data,
        store_question_status: action.payload.status,
        store_question_message: action.payload.message,
    });
}
const questionStoreUnSuccessFul = (state, action) => {
    return updateObject(state, {
        store_question_status: action.payload.status,
        store_question_message: action.payload.message,
    });
}



const questionStoreReset = (state, action) => {
    return updateObject(state, {
        store_question_status: null,
        store_question_message: null,
        delete_question_status: null
    });
}



const questionGetAllSuccessful = (state, action) => {
    return updateObject(state, {
        meta: action.payload.meta,
        questions: action.payload.data,
        get_questions_status: action.payload.status,
        get_questions_message: action.payload.message,
    });
}
const questionGetAllUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_questions_status: action.payload.status,
        get_questions_message: action.payload.message,
    });
}



const questionDeleteSuccessful = (state, action) => {
    return {
        ...state,
        delete_question_status: 200,
        questions: [...state.questions].filter(question => {
            return question.slug !== action.payload.slug
        })
    }
}
const questionDeleteUnsuccessful = (state, action) => {
    return {
        ...state
    }
}


const getQuestionSuccessful = (state, action) => {
    return updateObject(state, {
        question: action.payload.data,
        get_question_status: action.payload.status,
        get_question_message: action.payload.message,
    });
}
const getQuestionUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_question_status: action.payload.status,
        get_question_message: action.payload.message,
    });
}


const questionUpdateSuccessFul = (state, action) => {
    return updateObject(state, {
        question: action.payload.data,
        update_question_status: action.payload.status,
        update_question_message: action.payload.message,
    });
}
const questionUpdateUnSuccessFul = (state, action) => {
    return updateObject(state, {
        update_question_status: action.payload.status,
        update_question_message: action.payload.message,
    });
}


const questionUpdateReset = (state, action) => {
    return updateObject(state, {
        update_question_status: null,
        get_question_status: null,
    });
}


const initialState = {
    question: null,
    store_question_status: null,
    store_question_message: null,

    meta: null,
    questions: [],

    get_questions_status: null,
    get_questions_message: null,

    delete_question_status: null,

    get_question_status: null,
    get_question_message: null,

    update_question_status: null,
    update_question_message: null,
};


const reducer = (state = initialState, action) => {
    const QUESTION_SUCCESSFUL = QUESTION.SUCCESSFUL;
    const QUESTION_UNSUCCESSFUL = QUESTION.UNSUCCESSFUL;
    const QUESTION_RESET_STORE = QUESTION.RESET_STORE;

    const QUESTION_GET_ALL_SUCCESSFUL = QUESTION.GET_ALL_SUCCESSFUL;
    const QUESTION_GET_ALL_UNSUCCESSFUL = QUESTION.GET_ALL_UNSUCCESSFUL;

    const QUESTION_DELETE_SUCCESSFUL = QUESTION.DELETE_SUCCESSFUL;
    const QUESTION_DELETE_UNSUCCESSFUL = QUESTION.DELETE_UNSUCCESSFUL;

    const QUESTION_GET_SUCCESSFUL = QUESTION.GET_SUCCESSFUL;
    const QUESTION_GET_UNSUCCESSFUL = QUESTION.GET_UNSUCCESSFUL;

    const QUESTION_UPDATE_SUCCESSFUL = QUESTION.UPDATE_SUCCESSFUL;
    const QUESTION_UPDATE_UNSUCCESSFUL = QUESTION.UPDATE_UNSUCCESSFUL;

    const QUESTION_RESET_UPDATE = QUESTION.RESET_UPDATE;

    const lookup = {
        QUESTION_SUCCESSFUL: questionStoreSuccessFul,
        QUESTION_UNSUCCESSFUL: questionStoreUnSuccessFul,
        QUESTION_RESET_STORE: questionStoreReset,

        QUESTION_GET_ALL_SUCCESSFUL: questionGetAllSuccessful,
        QUESTION_GET_ALL_UNSUCCESSFUL: questionGetAllUnsuccessful,

        QUESTION_DELETE_SUCCESSFUL: questionDeleteSuccessful,
        QUESTION_DELETE_UNSUCCESSFUL: questionDeleteUnsuccessful,

        QUESTION_GET_SUCCESSFUL: getQuestionSuccessful,
        QUESTION_GET_UNSUCCESSFUL: getQuestionUnsuccessful,

        QUESTION_UPDATE_SUCCESSFUL: questionUpdateSuccessFul,
        QUESTION_UPDATE_UNSUCCESSFUL: questionUpdateUnSuccessFul,

        QUESTION_RESET_UPDATE: questionUpdateReset,
    }
    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;
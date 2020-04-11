import { QUESTION } from '../constants/Question.constant';


export const storeQuestion = payload => ({
    type: QUESTION.STORE,
    payload
});
export const storeQuestionSuccessful = payload => ({
    type: QUESTION.SUCCESSFUL,
    payload
});
export const storeQuestionUnsuccessful = payload => ({
    type: QUESTION.UNSUCCESSFUL,
    payload
});



export const resetStore = payload => ({
    type: QUESTION.RESET_STORE,
    payload
});


export const getAllQuestion = payload => ({
    type: QUESTION.GET_ALL,
    payload
});
export const getAllQuestionsSuccessful = payload => ({
    type: QUESTION.GET_ALL_SUCCESSFUL,
    payload
});
export const getAllQuestionsUnsuccessful = payload => ({
    type: QUESTION.GET_ALL_UNSUCCESSFUL,
    payload
});



export const deleteQuestion = payload => ({
    type: QUESTION.DELETE,
    payload
});
export const deleteQuestionSuccessful = payload => ({
    type: QUESTION.DELETE_SUCCESSFUL,
    payload
});
export const deleteQuestionUnsuccessful = payload => ({
    type: QUESTION.DELETE_UNSUCCESSFUL,
    payload
});



export const getQuestion = payload => ({
    type: QUESTION.GET,
    payload
});
export const getQuestionSuccessful = payload => ({
    type: QUESTION.GET_SUCCESSFUL,
    payload
});
export const getQuestionUnsuccessful = payload => ({
    type: QUESTION.GET_UNSUCCESSFUL,
    payload
});



export const updateQuestion = payload => ({
    type: QUESTION.UPDATE,
    payload
});
export const updateQuestionSuccessful = payload => ({
    type: QUESTION.UPDATE_SUCCESSFUL,
    payload
});
export const updateQuestionUnsuccessful = payload => ({
    type: QUESTION.UPDATE_UNSUCCESSFUL,
    payload
});

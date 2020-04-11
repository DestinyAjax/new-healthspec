import rootSaga from './sagas';
import rootReducer from './root.reducer';
import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware } from 'redux';
import { saveState, loadState } from './utils/localStorage';
import throttle from 'lodash/throttle';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, persistedState, composeEnhancers(
    applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

store.subscribe(throttle(() => {
    saveState({
        AuthReducer: store.getState().AuthReducer,
        ChoseRoleReducer: store.getState().ChoseRoleReducer
    });
}, 2000));

export default store;
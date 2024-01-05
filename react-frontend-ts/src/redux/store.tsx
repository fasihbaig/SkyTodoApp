import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import todoReducer from "./reducers/todo-reducer";
import createSagaMiddleware from "redux-saga";
import usersReducer from "./redux-saga/users/reducer";

import saga from "./redux-saga/sagas";

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    todo: todoReducer,
    users: usersReducer,
})

const store = legacy_createStore(rootReducer, { todo: [] }, applyMiddleware(sagaMiddleware as any));

sagaMiddleware.run(saga)

export default store;


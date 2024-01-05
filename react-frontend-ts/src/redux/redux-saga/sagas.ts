// sagas.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_USER_REQUEST } from './users/actionTypes';
import { fetchUsersSuccess, fetchUsersFailure } from './users/action';

function* fetchLoggedInUserDetails(): any {
    try {
        const response = yield call(() => axios.get('https://jsonplaceholder.typicode.com/users'));
        yield put(fetchUsersSuccess(response.data));
    } catch (error) {
        yield put(fetchUsersFailure((error as Error).message));
    }
}

function* watchFetchUsers() {
    yield takeLatest(FETCH_USER_REQUEST, fetchLoggedInUserDetails);
}

export default watchFetchUsers;

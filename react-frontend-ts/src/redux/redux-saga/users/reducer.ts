// reducers.ts
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from './actionTypes';

interface UsersState {
  data: any;
  loading: boolean;
  error: unknown | null;
}

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
};

function usersReducer<T>(state = initialState, action: { type: string, payload?: T }): UsersState {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default usersReducer;

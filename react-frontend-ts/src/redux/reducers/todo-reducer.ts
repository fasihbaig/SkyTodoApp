import { Todo } from "../../interface";
import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "../actions/todo";

const initialState: Todo[] = [];

export default (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.payload];

        case DELETE_TODO:
            return state.filter(todo => todo.id !== action.payload)

        case UPDATE_TODO:
            return state.map(todo => {
                if (todo.id === action.todo.id) {
                    return { ...todo, ...action.todo }
                }
                return todo
            });

        default:
            return state;
    }
}
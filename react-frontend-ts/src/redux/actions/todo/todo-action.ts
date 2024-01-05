import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "./todo-action-types";
import { Todo } from "../../../interface";

export const addTodo = (todo: Todo) => ({
    type: ADD_TODO,
    payload: todo
})

export const deleteTodo = (id: string) => ({
    type: DELETE_TODO,
    payload: id
})

export const updateTodo = (todo: Todo) => ({
    type: UPDATE_TODO,
    payload: todo
})
import { legacy_createStore as createStore } from 'redux'
import { todosReducer } from '../features/todos/todoReducer'

export const store = createStore(todosReducer)
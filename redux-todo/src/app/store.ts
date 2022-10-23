import { legacy_createStore as createStore } from 'redux'
import { todosReducer } from '../features/todos/reducer'

export const store = createStore(todosReducer)
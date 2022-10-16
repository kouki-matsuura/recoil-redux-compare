import { legacy_createStore as createStore} from 'redux'
import { todoListReducer } from "./todoListReducers";

export const store = createStore(todoListReducer)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { legacy_createStore as createStore} from 'redux'
import { todoListReducer } from "./todoListReducers";

export const reduxStore = createStore(todoListReducer)


export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch
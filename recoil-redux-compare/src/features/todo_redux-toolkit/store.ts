import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "./todoListSlice";

export const reduxToolkitStore = configureStore({
    reducer : {
        todoList : todoListReducer
    },
})

export type RootState = ReturnType<typeof reduxToolkitStore.getState>
export type AppDispatch = typeof reduxToolkitStore.dispatch
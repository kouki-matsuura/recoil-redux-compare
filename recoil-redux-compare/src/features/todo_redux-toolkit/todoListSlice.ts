import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../../common/todo.types";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos : [] as Todo[]
    },
    reducers: {
        add: (state , action: PayloadAction<Todo>) => {
            console.log("add:", action.payload)
            state.todos.push(action.payload)
        },
        remove: (state, action: PayloadAction<number>) => {
            console.log("remove:", action.payload)
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        update: (state, action: PayloadAction<Todo>) => {
            state.todos.map((todo) => todo.id === action.payload.id ? todo.isCompleted = !todo.isCompleted : todo)
        },
    }
});

export const { add, remove, update } = todosSlice.actions

export default todosSlice.reducer
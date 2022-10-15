import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../../common/todo.types";
import { RootState } from "./store";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos : [
            {
                id: 0,
                title: "sample",
                content: "discreption",
                isCompleted: false
            }
        ] as Todo[]
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
            console.log("sliceUpdate")
            const targetTodo = state.todos.filter((todo) => todo.id === action.payload.id)
            console.log("targetid:", targetTodo[0].id)
            state.todos[targetTodo[0].id] = action.payload
        },
    }
});

export const { add, remove, update } = todosSlice.actions

export const selectMaxID = (state: RootState) => {
    const todos = state.todoList.todos
    return todos.length === 0 ? 0 : todos.slice(-1)[0].id
}

export default todosSlice.reducer
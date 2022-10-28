import { bindActionCreators, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../common/todo.type"

const state = {
    todos: [
        {
            id: 1,
            title: "テスト1",
            content: "テスト1の内容",
            isCompleted: false
        },
        {
            id: 2,
            title: "テスト2",
            content: "テスト2の内容",
            isCompleted: false
        }
    ] as Todo[]
};
export const todoSlice = createSlice({
    name: 'todoSlice',
    initialState: state,
    reducers: {
        add: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload)
        },
        remove: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        toggleComplete: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.map((todo) => todo.id === action.payload
            ? {...todo, isComplete: !todo.isCompleted}
            : todo)
        }
    }
})

export const { add, remove, toggleComplete } = todoSlice.actions
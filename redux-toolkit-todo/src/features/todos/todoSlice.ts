import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../common/todo.type"

const state = {
    todos: [] as Todo[]
};
export const todoSlice = createSlice({
    name: 'todoSlice',
    initialState: state,
    reducers:{
        //Actionを記述する
    }
})
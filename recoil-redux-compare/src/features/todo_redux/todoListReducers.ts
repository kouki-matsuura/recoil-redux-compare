import { Todo } from "../../../common/todo.types";

const initialState = {
    todoList : [] as Todo[]
}

export const todoListReducer = (state = initialState, action :any) => {
    switch (action.type) {
        case "ADD":
            console.log("add:", action.payload)
            return { todoList: [...state.todoList, action.payload] }
            
        case "UPDATE":
           return { todoList: state.todoList.map((todo) => {
               if (todo.id !== action.payload.id) {
                return todo
               }

               return {
                ...todo,
                ...action.payload
               }
           })}
            
        case "REMOVE":
            console.log("remove:", action.payload)
            return {todoList: state.todoList.filter((todo) => todo.id !== action.payload)}
            
        default :
            return state
    }
}



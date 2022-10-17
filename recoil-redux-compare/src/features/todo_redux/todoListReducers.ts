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
            const taregtTodo = state.todoList.filter((todo) => todo.id === action.payload.id)
            console.log("target:", taregtTodo)
            return { todoList: [state.todoList.slice(0,taregtTodo[0].id),
                        {...taregtTodo[0],
                         isCompleted: !taregtTodo[0].isCompleted},
                        state.todoList.slice(taregtTodo[0].id+1)]
                    }
            
        case "REMOVE":
            console.log("remove:", action.payload)
            return {todoList: state.todoList.filter((todo) => todo.id !== action.payload)}
            
        default :
            return state
    }
}



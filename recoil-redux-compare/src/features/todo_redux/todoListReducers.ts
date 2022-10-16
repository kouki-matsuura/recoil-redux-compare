import { Todo } from "../../../common/todo.types";

const initialState = {
    todoList : [] as Todo[]
}

export const todoListReducer = (state = initialState.todoList, action : any) => {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload]
            
        case "UPDATE":
            const taregtTodo = state.filter((todo) => todo.id === action.payload.id)
            
            return [state.slice(0,taregtTodo[0].id),
                        {...taregtTodo[0],
                         isCompleted: !taregtTodo[0].isCompleted},
                        state.slice(taregtTodo[0].id+1)]
            
        case "REMOVE":
            return state.filter((todo) => todo.id === action.payload.id)
            
        default :
            return state   
    }
}



import { state as initialState } from "./state";

/** TODO: actionをちゃんとした型に直す */
export const todosReducer = (state = initialState, action : any) => {
    switch (action.type) {
        case "ADD":
            return { todos: [...state.todos, action.payload] }

        case "TOGGLE_COMPLETE":
            return { todos: state.todos.map((todo) => {
                if (todo.id !== action.payload) {
                    return todo
                }

                return {...todo, isCompleted : !todo.isCompleted}
            })}

        case "REMOVE":
            return {todos : state.todos.filter((todo) => todo.id !== action.payload)}

        default:
            return state;
    }
}
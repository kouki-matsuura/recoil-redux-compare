import { Todo } from "../../common/todo.type";
/** Todoを加えるアクションを返す */
export const addTodoAction = (newTodo : Todo) => {
    return {
        type: "ADD",
        payload: newTodo
    }
}
/** Todoを更新するアクションを返す */
export const toggleCompleteAciton = (id : number) => {
    return {
        type: "TOGGLE_COMPLETE",
        payload: id
    }
}
/** Todoを削除するアクションを返す */
export const removeTodoAction = (id : number) => {
    return {
        type: "REMOVE",
        payload: id
    }
}
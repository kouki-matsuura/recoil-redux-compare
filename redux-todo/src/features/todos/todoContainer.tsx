import { useDispatch, useSelector } from "react-redux"
import { store } from "../../app/store"
import { RootState } from "../../common/rootState.type"
import { Todo } from "../../common/todo.type"
import { addTodoAction, removeTodoAction, toggleCompleteAciton } from "./action"
import { TodoPresenter } from "./todoPresenter"

export const TodoContainer = () => {
    const todos = useSelector((state : RootState) => state.todos)

    const maxID = todos.length ? todos.slice(-1)[0].id : 0;
    const dispatch = useDispatch();

    const addTodo = (title: string, content: string) => {
        const newTodo : Todo = {
            id: maxID+1,
            title: title,
            content: content,
            isCompleted: false
        }
        dispatch(addTodoAction(newTodo))
    }

    const removeTodo = (id: number) => {
        dispatch(removeTodoAction(id))
    }

    const toggleComplete = (id: number) => {
        dispatch(toggleCompleteAciton(id))
    }

    const args = {
        todos,
        addTodo,
        removeTodo,
        toggleComplete
    }
    return <TodoPresenter {...args} />
}

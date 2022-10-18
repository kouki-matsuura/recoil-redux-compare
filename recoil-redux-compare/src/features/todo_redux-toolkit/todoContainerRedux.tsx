import { Todo } from "../../../common/todo.types"
import { useAppDispatch, useAppSelector } from "./hooks"
import { add, remove, update } from "./todoListSlice"
import { TodoPresetnerRedux } from "./todoPresenterRedux"

export const TodoContainerReduxToolkit = () => {
    const todos = useAppSelector(state => state.todoList.todos)
    const dispatch = useAppDispatch()
    const maxID = todos.length === 0 ? 0 : todos.slice(-1)[0].id;

    const addTodo = (title: string, content: string) => {
        const newTodo : Todo = {
            id: maxID+1,
            title: title,
            content: content,
            isCompleted: false,
        }
        dispatch(add(newTodo))
    }

    const removeTodo = (id : number) => {
        dispatch(remove(id))
    }

    const updateTodo = (todo: Todo) => {
        todo = {...todo, isCompleted: true}
        dispatch(update(todo))
    }
    
    const args = {
        todos,
        addTodo,
        removeTodo,
        updateTodo
    }
    return (
        <TodoPresetnerRedux  {...args} />
    )
}
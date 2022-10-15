import { Todo } from "../../../common/todo.types"
import { useAppDispatch, useAppSelector } from "./hooks"
import { add, remove, selectMaxID, update } from "./todoListSlice"
import { TodoPresetnerRedux } from "./todoPresenterRedux"

export const TodoContainerRedux = () => {
    const todos = useAppSelector(state => state.todoList.todos)
    const dispatch = useAppDispatch()
    const maxID = useAppSelector(selectMaxID);

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

    const updateTodo = (targetTodo : Todo) => {
        dispatch(update(targetTodo))
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
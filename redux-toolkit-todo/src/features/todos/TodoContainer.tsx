import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../common/rootState.type"
import { Todo } from "../../common/todo.type"
import { TodoPresenter } from "./TodoPresenter"
import { add, remove, updateComplete} from "./todoSlice"

export const TodoContainer = () => {
    const todos = useSelector((state : RootState) => state.todos)

    const maxID = todos.length ? todos.slice(-1)[0].id : 0;
    const dispatch = useDispatch();
    
    const addTodo = (title: string, content: string) => {
        const newTodo : Todo = {
            id: maxID+1,
            title: title,
            content: content,
            isCompleted: false,
        }
        dispatch(add(newTodo))
    }

    const removeTodo = (id: number) => {
        dispatch(remove(id))
    }

    const toggleComplete = (id: number) => {
        console.log("aaa")
        dispatch(updateComplete(id));
    }
    const args = {
        todos,
        addTodo,
        removeTodo,
        toggleComplete
    }
    return <TodoPresenter {...args} />
}

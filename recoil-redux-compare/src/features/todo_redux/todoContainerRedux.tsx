import { useDispatch, useSelector } from "react-redux"
import { Todo } from "../../../common/todo.types";
import { useAppSelector } from "./hooks";
import { TodoPresetnerRedux } from "./todoPresenterRedux";

export const TodoContainerRedux = () => {
    const todos = useAppSelector(state);
    const maxID = useSelector(selectMaxID)
    const dispatch = useDispatch();
    const addTodo = (title : string, content: string) => {
        const newTodo : Todo = {
            id: maxID+1,
            title: title,
            content: content,
            isCompleted: false,
        }
        dispatch({ type: "ADD", payload: newTodo})
    };

    const removeTodo = (id : number) => {
        dispatch({ type: "REMOVE", payload: id})
    }

    const updateTodo = (targetTodo: Todo) => {
        dispatch({ type: "UPDATE", payload: targetTodo})
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
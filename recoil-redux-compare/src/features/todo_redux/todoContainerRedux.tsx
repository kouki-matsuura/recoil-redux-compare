import { Todo } from "../../../common/todo.types";
import { useAppDispatch, useAppSelector } from "./hooks";
import { TodoPresetnerRedux } from "./todoPresenterRedux";

export const TodoContainerRedux = () => {

    const todos = useAppSelector(state => state.todoList);
    const maxID = todos.length === 0 ? 0 : todos.slice(-1)[0].id
    const dispatch = useAppDispatch();
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
        targetTodo = {...targetTodo, isCompleted: true}
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
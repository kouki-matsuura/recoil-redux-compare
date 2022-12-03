import { TodoListOutputPresenter } from "../presenter/TodoListOutputPresenter";
import { useGetTodos, useTodoAction } from "../todoState"

export const TodoListOutputContainer = () => {
    const {removeTodo, toggleComplete} = useTodoAction();
    const {todoIds} = useGetTodos();

    const args = {
        todoIds,
        removeTodo,
        toggleComplete,
    }
    console.log("outputcontainer")
    return <TodoListOutputPresenter {...args} />
}
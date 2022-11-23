import { TodoOutputPresenter } from "../presenter/TodoOutputPresenter";
import { useGetTodos, useTodoAction } from "../todoState"

export const TodoOutputContainer = () => {
    const {removeTodo, toggleComplete} = useTodoAction();
    const {todoIds, allTodos} = useGetTodos();

    const args = {
        todoIds,
        allTodos,
        removeTodo,
        toggleComplete,
    }

    return <TodoOutputPresenter {...args} />
}
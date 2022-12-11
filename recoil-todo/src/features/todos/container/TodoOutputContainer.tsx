import { TodoOutputPresenter } from "../presenter/TodoOutputPresenter"
import { useGetTodoAction, useTodoAction } from "../todoState"

type TodoOutputContainerProps = {
    todoId : number
}
export const TodoOutputContainer : React.FC<TodoOutputContainerProps> = ({
    todoId
}) => {
    const { useGetTodo } = useGetTodoAction();
    const { removeTodo, toggleComplete } = useTodoAction();

    const todo = useGetTodo(todoId);

    const args = {
        todo,
        removeTodo,
        toggleComplete
    }
    return <TodoOutputPresenter {...args}/>
}
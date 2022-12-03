import { TodoPresenter } from "../presenter/TodoPresenter"
import { useGetTodos } from "../todoState"
type TodoContainerProps = {
    todoId : number
    removeTodo : (id: number) => void
    toggleComplete : (id: number) => void
}
export const TodoContainer: React.FC<TodoContainerProps> = ({
    todoId,
    removeTodo,
    toggleComplete
}) => {
    const {useGetTodo} = useGetTodos();
    const todo = useGetTodo(todoId);
    console.log("todoconitaner")
    if(todo == null) return <>Todoがありません</> 
    return <TodoPresenter todo={todo} removeTodo={removeTodo} toggleComplete={toggleComplete}/>
}
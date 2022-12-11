import { TodosOutputPresenter } from "../presenter/TodosOutputPresenter"
import { useGetTodoAction } from "../todoState"

export const TodosOutputContainer = () => {
    const { todoIds } = useGetTodoAction();
   
    return <TodosOutputPresenter todoIds={todoIds}/>
}
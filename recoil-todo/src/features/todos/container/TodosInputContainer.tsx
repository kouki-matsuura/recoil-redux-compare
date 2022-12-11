import { TodosInputPresenter } from "../presenter/TodosInputPresenter"
import { useTodoAction } from "../todoState"

export const TodosInputContainer = () => {
    const { addTodo } = useTodoAction();

    return <TodosInputPresenter addTodo={addTodo} />
}
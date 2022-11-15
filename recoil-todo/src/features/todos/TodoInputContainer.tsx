import { TodoInputPresenter } from "./TodoInputPresenter";
import { useTodo } from "./todoState"

export const TodoInputContainer = () => {
   const addTodo = useTodo.useAddTodo();

    return <TodoInputPresenter addTodo={addTodo} />
}
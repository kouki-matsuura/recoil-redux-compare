import { TodoInputPresenter } from "./TodoInputPresenter";
import { useTodo } from "./todoState"

export const TodoInputContainer = () => {
   const addTodo = useTodo.useAddTodo();
   console.log("input");
    return <TodoInputPresenter addTodo={addTodo} />
}
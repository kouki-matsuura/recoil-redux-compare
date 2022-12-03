import { TodoListInputPresenter } from "../presenter/TodoListInputPresenter";
import {useTodoAction } from "../todoState"

export const TodoListInputContainer = () => {
    const {addTodo} = useTodoAction();

    return <TodoListInputPresenter addTodo={addTodo}/>
}
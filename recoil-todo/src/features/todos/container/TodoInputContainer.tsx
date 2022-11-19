import { TodoInputPresenter } from "../presenter/TodoInputPresenter";
import {useTodoAction } from "../todoState"

export const TodoInputContainer = () => {
    const {addTodo} = useTodoAction();

    return <TodoInputPresenter addTodo={addTodo}/>
}
import { useRecoilState, useRecoilValue } from "recoil";
import { TodoOutputPresenter } from "./TodoOutputPresenter";
import { todosSelector, useTodo } from "./todoState";

export const TodoOutputContainer = () => {
    const todos = useRecoilValue(todosSelector);
    const removeTodo = useTodo.useRemoveTodo();
    const toggleComplete = useTodo.useToggleComplete();
    
    return <TodoOutputPresenter todos={todos} removeTodo={removeTodo} toggleComplete={toggleComplete}/>;
}
import { memo } from "react";
import { Todo } from "../../../common/todo.type";
import { useGetTodos } from "../todoState";

type TodoOutputProps = {
    todo : Todo
    removeTodo : (id: number) => void
    toggleComplete : (id: number) => void
}
export const TodoOutput : React.FC<TodoOutputProps>= memo(({
    todo,
    removeTodo,
    toggleComplete,
}) => {
    console.log("ID:"+ todo.id+ "のレンダリング");
    return (
        <>
        <div>{todo.title} : {todo.isCompleted ? "完了" : "未完了"}</div>
        <div>内容：{todo.content}</div>
        <button type='button' onClick={() => toggleComplete(todo.id)}>{todo.isCompleted ? "戻す" : "完了"}</button>
        <button type='button' onClick={() => removeTodo(todo.id)}>削除</button>
        </>
    )
})
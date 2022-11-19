import React from "react"
import { Todo } from "../../../common/todo.type"
type TodoOutputPresenterProps = {
    todoIds : number[]
    allTodos : (Todo|null)[]
    removeTodo : (id: number) => void
    toggleComplete : (id: number) => void
    useGetTodo: (id: number) => Todo| null
}
export const TodoOutputPresenter: React.FC<TodoOutputPresenterProps> = ({
    todoIds,
    allTodos,
    removeTodo,
    toggleComplete,
    useGetTodo
}) => {
    console.log("出力部のレンダリング")
    return (
        <>
            <div>-------------------------</div>
            <h1>Todoリスト</h1>
            {
            allTodos.map((todo)=> {
                return ( 
                    todo?
                    <React.Fragment key={todo.id}>
                        <div>{todo.title} : {todo.isCompleted ? "完了" : "未完了"}</div>
                        <div>内容：{todo.content}</div>
                        <button type='button' onClick={() => toggleComplete(todo.id)}>{todo.isCompleted ? "戻す" : "完了"}</button>
                        <button type='button' onClick={() => removeTodo(todo.id)}>削除</button>
                    </React.Fragment>
                    :
                    <div>NULL</div>
                )
            })}
        </>
    )
}
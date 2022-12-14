import React from "react"
import { Todo } from "../../common/todo.type"

type TodoOutputPresenterProps = {
    todos: Todo[]
    removeTodo: (id: number) => void
    toggleComplete: (id: number) => void
}

export const TodoOutputPresenter : React.FC<TodoOutputPresenterProps> = ({
    todos,
    removeTodo,
    toggleComplete
}) => {
    return (
    <>
    <h1>Todoリスト</h1>
    {todos.map((todo : Todo)=> {
        return ( 
            <React.Fragment key={todo.id}>
                <div>{todo.title} : {todo.isCompleted ? "完了" : "未完了"}</div>
                <div>内容：{todo.content}</div>
                <button type='button' onClick={() => toggleComplete(todo.id)}>{todo.isCompleted ? "戻す" : "完了"}</button>
                <button type='button' onClick={() => removeTodo(todo.id)}>削除</button>
            </React.Fragment>
        )
    })}
    </>
    )
}
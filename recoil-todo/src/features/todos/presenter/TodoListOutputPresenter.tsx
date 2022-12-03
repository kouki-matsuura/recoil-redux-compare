import React  from "react"
import { Todo } from "../../../common/todo.type"
import { TodoContainer } from "../container/TodoContainer"
import { SamplePresneter } from "./SamplePresenter"
import { TodoPresenter } from "./TodoPresenter"
type TodoListOutputPresenterProps = {
    todoIds : number[]
    removeTodo : (id: number) => void
    toggleComplete : (id: number) => void
}
export const TodoListOutputPresenter: React.FC<TodoListOutputPresenterProps> =({
    todoIds,
    removeTodo,
    toggleComplete,
}) => {
    console.log("出力部のレンダリング")
    return (
        <>
            <SamplePresneter />
            {
            todoIds.map((todoId)=> 
                    <TodoContainer
                    key={todoId}
                    todoId={todoId} 
                    removeTodo={removeTodo}
                    toggleComplete={toggleComplete}
                    />
            )
            }
        </>
    )
}
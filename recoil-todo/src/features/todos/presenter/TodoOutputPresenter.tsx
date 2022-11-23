import React  from "react"
import { Todo } from "../../../common/todo.type"
import { SamplePresneter } from "./SamplePresenter"
import { TodoOutput } from "./TodoOutput"
type TodoOutputPresenterProps = {
    todoIds : number[]
    allTodos: (Todo|null)[]
    removeTodo : (id: number) => void
    toggleComplete : (id: number) => void
}
export const TodoOutputPresenter: React.FC<TodoOutputPresenterProps> =({
    todoIds,
    allTodos,
    removeTodo,
    toggleComplete,
}) => {
    return (
        <>
            <SamplePresneter />
            {
            allTodos.map((todo)=> 
                todo ?
                    <TodoOutput 
                    key={todo.id}
                    todo={todo} 
                    removeTodo={removeTodo}
                    toggleComplete={toggleComplete}
                    />
                :
                    <></>
                )
            }
        </>
    )
}
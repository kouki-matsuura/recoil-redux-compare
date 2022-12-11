import React, { memo } from "react";
import { TodoOutputContainer } from "../container/TodoOutputContainer";

type TodosOutputPresenterProps = {
    todoIds : number[]
}
export const TodosOutputPresenter : React.FC<TodosOutputPresenterProps> = memo(({
    todoIds
}) => {
    console.log("出力部のレンダリング")
    return (
    <>
    <div>-------------------------</div>
    <h1>Todoリスト</h1>
    {todoIds.map(todoId => 
        <TodoOutputContainer 
        key={todoId}
        todoId={todoId}/>
    )}
    </>
    )
})
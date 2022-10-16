import { useState } from "react";
import styled from "styled-components";
import { Todo } from "../../../common/todo.types";

type todoPresetnerReduxProps = {
    todos : Todo[],
    addTodo : (title: string, content: string) => void,
    removeTodo : (id : number) => void,
    updateTodo : (targetTodo : Todo) => void
}
export const TodoPresetnerRedux : React.FC<todoPresetnerReduxProps> = ({
    todos,
    addTodo,
    removeTodo,
    updateTodo}) => {
        const [ title, setTitle ] = useState("");
        const [content, setContent] = useState("");
        const onSubmit = () => {
            addTodo(title, content);
            setTitle("");
            setContent("");
        }
    return (
        <>
            <div>Redux-ToolkitのTodoリスト</div>
            <form>
                <label>
                    タイトル：
                    <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
                </label>
                <label>
                    内容：
                    <input type="text" value={content} onChange={event => setContent(event.target.value)}/>
                </label>
                <button type="button" onClick={onSubmit}>送信</button>
            </form>
            <div>---------------------</div>
            {
                todos.map((todo : Todo) => {
                    return (
                        <div key={todo.id}>
                        <div>{todo.title} : {todo.isCompleted ? "完了" : "未完了"}</div>
                        <div>内容：{todo.content}</div>
                        <CompleteButton type='button' onClick={() => updateTodo({...todo, isCompleted: true})}>完了</CompleteButton>
                        <RemoveButton type='button' onClick={() => removeTodo(todo.id)}>削除</RemoveButton>
                        </div>
                    )
                })
            }
        </>
    )
}

const CompleteButton = styled.button`
    background-color : blue
`;

const RemoveButton = styled.button`
    background-color : red
`;
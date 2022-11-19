import { useState } from "react"

type TodoInputPresenterProps = {
    addTodo: (title: string, content: string) => void
}
export const TodoInputPresenter : React.FC<TodoInputPresenterProps> = ({
    addTodo
}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const sendTodo = () => {
        addTodo(title, content)
        setTitle("")
        setContent("")
    }
    console.log("入力部のレンダリング")
    return (
        <form>
            <label>タイトル：
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </label>
            <label>内容：
                <input type="text" value={content} onChange={e => setContent(e.target.value)} />
            </label>
            <button type="button" onClick={() => sendTodo()}>送信</button>
        </form>
    )
}
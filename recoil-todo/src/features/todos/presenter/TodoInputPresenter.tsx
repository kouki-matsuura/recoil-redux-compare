import { useState } from "react";

export const TodoInputPresenter = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const sendTodo = () => {
        setTitle("")
        setContent("")
    }

    return (
        <form>
            <label>
                タイトル：
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </label>
            <label>
                内容：
                <input type="text" value={content} onChange={e => setContent(e.target.value)} />
            </label>
            <button type="button" onClick={() => sendTodo()}>送信</button>
        </form>
    )
}
import { useSelector } from "react-redux"
import { RootState } from "../../common/rootState.type"
import { TodoPresenter } from "./TodoPresenter"

export const TodoContainer = () => {
    const todos = useSelector((state : RootState) => state.todos)

    const args = {
        todos,
    }
    return <TodoPresenter {...args} />
}

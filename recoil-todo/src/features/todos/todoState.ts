import { atom, atomFamily, selector, selectorFamily, useRecoilCallback, useRecoilValue } from 'recoil';
import { AtomFamilyKeys, AtomKeys, SelectorKeys } from '../../common/recoilKeys';
import { Todo } from '../../common/todo.type';


const todoState = atomFamily<Todo|null, number>({
    key: AtomKeys.TODOS_STATE,
    default: null
})

const todoIdState = atom<number[]>({
  key: AtomKeys.TODO_ID_STATE,
  default: []
})

let id = 1;
const getId = () => {
  return id++;
}

const stateTodos = selector({
  key: "state-todos",
  get: ({ get }) => {
    const todoIds = get(todoIdState);
    return todoIds.map((todoId) => 
      get(todoState(todoId))
      
    )
  },
})

export const useGetTodos = () => {
  const todoIds =  useRecoilValue(todoIdState);

  const useGetTodo =  (id:number) => useRecoilValue(todoState(id));

  return {
    todoIds,
    useGetTodo,
  }

}
export const useTodoAction = () => {
  /** 追加処理 */
  const addTodo = useRecoilCallback(({ set }) => (title: string, content: string) => {
    const newTodo: Todo = {
      id : getId(),
      title : title,
      content : content,
      isCompleted: false
    }

    set(todoIdState, prev => [...prev, newTodo.id]);
    set(todoState(newTodo.id), newTodo);
  }, [])

  /** 削除処理 */
  const removeTodo = useRecoilCallback(({ set, reset }) => (targetId : number) => {
    set(todoIdState, prev => prev.filter(id => id !== targetId));
    reset(todoState(targetId))
  }, [])

  /** 完了の切り替え */
  const toggleComplete = useRecoilCallback(({set}) => (targetId: number) => {
      set(todoState(targetId), currVal => {
        if (!currVal) return null

        return {...currVal, isCompleted: !currVal.isCompleted}
      })
  }, [])
  return {
    addTodo,
    removeTodo,
    toggleComplete,
  }
}



import { atom, atomFamily, selector, useRecoilCallback } from 'recoil';
import { AtomKeys, SelectorKeys } from '../../common/recoilKeys';
import { Todo } from '../../common/todo.type';

// export const todosState = atom<Todo[]>({
//   key: AtomKeys.TODOS_STATE,
//   default: [
//     {
//       id: 1,
//       title: "テスト1",
//       content: "テスト1の内容",
//       isCompleted: false
//     },
//     {
//       id: 2,
//       title: "テスト2",
//       content: "テスト2の内容",
//       isCompleted: false
//     }
//   ],
// });

const todosState = atomFamily<Todo|null, number>({
  key: AtomKeys.TODOS_STATE,
  default: null
})

const todoIdState = atom<number[]>({
  key: AtomKeys.TODOID_STATE,
  default: []
})

let id = 1;
const getId = () => {
  return id++;
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
    set(todosState(newTodo.id), newTodo);
  }, [])
  /** 削除処理 */
  const removeTodo = useRecoilCallback(({ set, reset }) => (targetId : number) => {
    set(todoIdState, prev => prev.filter(id => id !== targetId));
    reset(todosState(targetId))
  }, [])

  /** 完了の切り替え */
  const toggleComplete = useRecoilCallback(({set}) => (targetId: number) => {
      set(todosState(targetId), todo => {
        if (!todo) return null
        return {...todo, isCompleted: !todo.isCompleted}
      })
  }, [])
  return {
    addTodo,
    removeTodo,
    toggleComplete,
  }
}

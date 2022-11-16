import { atom, atomFamily, selector, selectorFamily } from 'recoil';
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

const todoState = atomFamily<Todo|null, number>({
    key: AtomKeys.TODOS_STATE,
    default: null
})

const todoIdState = atom<number[]>({
  key: AtomKeys.TODO_ID_STATE,
  default: []
})

const todoIdSelector = selector<number[]>({
  key: SelectorKeys.TODO_ID_SELECTOR,
  get: ({ get }) => get(todoIdState)
})

const todoSelector = selectorFamily<Todo|null, number>({
  key: SelectorKeys.TODO_SELECTOR,
  get: (id) => ({ get }) => {
    return get(todoState(id))
  }
})

let id = 1;
const getId = () => {
  return id++;
}

export const useTodo = () => {
  const todoState
}

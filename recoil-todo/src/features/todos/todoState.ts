import { atom, atomFamily, selector } from 'recoil';
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
export const maxIDSelector = selector<number>({
  key: SelectorKeys.TODO_MAXID,
  get: ({get}) => {
    return get(todosState).length ? get(todosState).slice(-1)[0].id : 0
  }
})

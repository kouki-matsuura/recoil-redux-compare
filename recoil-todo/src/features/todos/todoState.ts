import { atom, selector, useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { AtomKeys, SelectorKeys } from '../../common/recoilKeys';
import { Todo } from '../../common/todo.type';

const todosState = atom<Todo[]>({
  key: AtomKeys.TODOS_STATE,
  default: [
    {
      id: 1,
      title: "テスト1",
      content: "テスト1の内容",
      isCompleted: false
    },
    {
      id: 2,
      title: "テスト2",
      content: "テスト2の内容",
      isCompleted: false
    }
  ],
});

 type TodoActions = {
  useAddTodo: () => (title: string, content: string) => void,
  useRemoveTodo: () => (id: number) => void,
  useToggleComplete: () => (id: number) => void,
 }

 let id = 3;
 const getID = () => {
  return id++;
 }

export const useTodo: TodoActions = {

  /** Todoを新規追加 */
  useAddTodo: () =>
    useRecoilCallback(({ set }) => (title: string, content: string) => {
      console.log("useAddTodo")
      set(todosState, (todos) => {
        const newTodo: Todo = {
          id: getID(),
          title: title,
          content: content,
          isCompleted: false,
        }
        return [...todos, newTodo];
      })
    },[getID] ),
  
  useRemoveTodo: () =>
    useRecoilCallback(({ set }) => (id: number) => {
      console.log("removeTodo")
      set(todosState, (todos) => {
        return todos.filter((todo) => todo.id !== id)
      })
    },[]),

  useToggleComplete: () =>
    useRecoilCallback(({ set }) => (id: number) => {
      console.log("toggleComplete")
      set(todosState, (todos) => {
        const newTodos = todos.map((todo) => 
        todo.id === id
        ? {...todo, isCompleted: !todo.isCompleted}
        : todo
        )
        return newTodos
      })
    },)
}

export const todosSelector = selector<Todo[]>({
  key: SelectorKeys.TODO_TODOS,
  get: ({ get }) => get(todosState)
});
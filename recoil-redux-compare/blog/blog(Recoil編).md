こんにちは！ラクス入社1年目のkoki_matsuraです。

本日は、Recoilの基本的な状態管理や仕組みをTodoアプリ作成を通して、ご紹介させていただきます。

こちらの記事は「Todoアプリ作成を通したReactの状態管理ライブラリ基礎学習」の3部目です。
「Redux編」「Redux-Toolkit編」もあるので、良ければ読んでいただけると嬉しいです。

Reactの状態管理ライブラリを勉強している方、状態管理ライブラリについて簡単に知りたい方などのお役に立てればなと書かせていただきました。

アジェンダは以下の通りです。

[:contents]

## Recoilとは

### 概要
RecoilはContextAPIが抱えるレンダリングやコード分割の問題を解決するために提唱された、現時点では実験的な状態管理ライブラリであり、アプリケーションの状態をAtomとSelectorの集まりで管理します。

AtomはStateの単位で一意のキーとデータで管理、SelectorはAtomや他Selectorを受け取る純粋な関数です。Atomを加工して取得したりする目的で用いられます。
 
Hooks APIを使って、状態管理を行う点がRecoilの特徴です。

### 構成図
Recoilは下図のような仕組みの状態管理をしています。
<div align="center">
[f:id:koki_matsura:20221102094723p:plain]
</div>

コンポーネントからHooks APIを使用することで簡単にAtomやSelectorの値を取得、変更、更新することができます。

Reduxを使ってから、Recoilを使ってみると、かなり単純で使いやすいことに気づきます。

## Todoアプリ作成

### 仕様説明
Todoアプリを作成する前にTodoアプリの仕様と構成を説明します。

構成は以下の画像のようになります。
<div align="center">
[f:id:koki_matsura:20221102094833p:plain]
</div>

入力フォームと送信ボタン、Todoのリストを載せる部分で構成されます。

また、それぞれのTodoには内容に加え、完了ボタン、削除ボタンがあります。

仕様を説明します。

**・Todoの追加**

画像上部のタイトル・内容の入力フォームに適当なテキストを入力し、送信ボタンを押すことでTodoリストに入力したTodoが追加されます。
<div align="center">
[f:id:koki_matsura:20221102163321g:plain]
</div>
**・Todoリストの表示**

画像下部のTodoリストは古いもの（ID昇順）から順に表示されます。最も新しいものは最後尾に表示されます。

**・Todoの完了**

それぞれのTodoについている完了ボタンを押すと、該当するTodoが未完了から完了に変化します。

また、完了しているTodoには「戻す」ボタンが表示されており、これは完了ボタンの逆の働きをします。
<div align="center">
[f:id:koki_matsura:20221102145008g:plain]
</div>

**・Todoの削除**

それぞれのTodoについている削除ボタンを押すと、該当するTodoがリストから削除され、表示からも消えます。
<div align="center">
[f:id:koki_matsura:20221102145120g:plain]
</div>

以上が今回作成していくTodoアプリの仕様になっています。

### プロジェクト作成

プロジェクトの作成は下記のコマンドを入力します。

私はプロジェクト名を「recoil-todo」としましたが、お好きなプロジェクト名をつけていただいて問題ありません。
```bash
npx create-react-app [プロジェクト名] --template typescript

```

### 初期設定
プロジェクト作成後、下記のコマンドでプロジェクトに移動して、Recoilを使えるようにします。

```bash
cd recoil-todo
npm i recoil
```

### ディレクトリ構成

Recoilを用いるときのディレクトリ構成は以下のようにします。
<div align="center">
[f:id:koki_matsura:20221102142759p:plain]
</div>

commonディレクトリ、featuresディレクトリ、featuresディレクトリの中にtodosディレクトリを作成します。

- commonディレクトリ
  - recoilKeys.tsの新規作成
  - todo.type.tsの新規作成

「recoilKeys.ts」にはRecoilの状態管理で必要となるAtomやSelectorのユニークなキーを格納します。キーについては後ほど詳しく書かせていただきます。

「todo.type.ts」は今回のTodoアプリで出てくるTodoのタイプを定義します。

- features/todosディレクトリ
  - TodoContainer.tsxの新規作成
  - TodoPresenter.tsxの新規作成
  - todoState.tsの新規作成

「TodoContainer.tsx」はTodoアプリのロジック部分を、「TodoPresenter.tsx」の表示部分を担当します。

「todoState.ts」には状態を管理するAtomとAtomを加工するSelectorを定義します。

### Todo型の定義
Todo型を下記のように定義します。

```typescript
//todo.type.ts
export type Todo = {
  id: number,
  title: string,
  content: string,
  isCompleted: boolean
}
```

### Keyの定義
KeyはAtomやSelectorに必須です。これは、AtomやSelectorにおける特定の高度なAPIに使用されるため、複数のAtomが同じキーを持つことは禁止されています。

今回の場合はTodoを管理するAtomが一つ、それを加工するSelectorが一つのため、Keyが重複する心配はそれほどありませんが、今後、状態が増えたりする可能性がある場合に重複させないためにもKeyを一元管理させます。

「recoilKeys.ts」にAtomのKeyを下記のように一つ定義します。

```typescript
//recoilKeys.ts
export const AtomKeys = {
    "TODOS_STATE" : "todosState"
}
```
</details>
<details>
<summary  style="cursor:pointer;">▶︎Atomの定義</summary>
Keyを定義できたので、「todoState.ts」にAtomを定義します。

Atomで定義するものはKeyとStateのみです。Reducerのようなものは書きません。

```typescript
//todoState.ts
export const todosState = atom({
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
  ] as Todo[],
});
```

### TodoContainer.tsxの定義
このファイルではTodoアプリのロジック部分を担当します。

RecoilではStoreのようなものはなく、Atom単位で取得してきます。

Atomの取得だけしたいときには「useRecoilValue」を、Atomの変更だけしたいときには「useSetRecoilState」を使います。
また、useStateのように取得と変更を両方したいときには、「useRecoilState」を使います。

今回は一旦、Todoの表示だけを実装したいので「useRecoilValue」を使います。後にTodoの追加機能の際、書き換えます。

TodoPresenterはまだ定義していないのでエラーが出ていても問題ありません。
```typescript
//TodoContainer.tsx
import { useRecoilValue } from "recoil"
import { todosState } from "./todoState"

export const TodoContainer = () => {
    const todos = useRecoilValue(todosState);

    const args = {
        todos,
    }
    return <TodoPresenter {...args} />
}
```

### TodoPresenter.tsxの定義
このアプリではTodoアプリの表示部分を担当します。

Todoリストを表示します。
まずは、色々な機能を作る前に基盤を作りたいので下記のようなコードにします。
```typescript
//TodoPresenter.tsx
import React, { useState } from "react"
import { Todo } from "../../common/todo.type"

type TodoPresenterProps = {
    todos : Todo[]
}
export const TodoPresenter : React.FC<TodoPresenterProps> = ({
    todos,
}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    
    return (
    <>
    <form>
        <label>
            タイトル：
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
            内容：
            <input type="text" value={content} onChange={e => setContent(e.target.value)} />
        </label>
        <button type="button">送信</button>
    </form>
    <div>-------------------------</div>
    <h1>Todoリスト</h1>
    {todos.map((todo : Todo)=> {
        return ( 
            <React.Fragment key={todo.id}>
                <div>{todo.title} : {todo.isCompleted ? "完了" : "未完了"}</div>
                <div>内容：{todo.content}</div>
                <button type='button'>{todo.isCompleted ? "戻す" : "完了"}</button>
                <button type='button'>削除</button>
            </React.Fragment>
        )
    })}
    </>
    )
}
```
入力部にはタイトルと内容の入力フォームとまだ機能のついていない送信ボタンを配置しています。

出力部にはTodoリストをmap関数で出力しています。それぞれのTodoにつくボタンも現時点では機能がついていません。

一旦、これで置いておきます。

 ### RecoilRootの定義

Stateを共有したいコンポーネントをRecoilRootで囲むことで簡単にそのコンポーネントをルートコンポーネントにしてStateを共有できます。

「App.tsx」を書き換えます。
```typescript
//App.tsx
import React from 'react';
import { RecoilRoot } from 'recoil';
import { TodoContainer } from './features/todos/TodoContainer';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <TodoContainer />
      </RecoilRoot>
    </div>
  );
}

export default App;
```

### アプリの起動
下記のコマンドで起動してみましょう。

```bash
npm start
```
自動で開くと思いますが、開かない方は「http://localhost:3000/」にアクセスしてください。

次のようにStateを定義したときに入れたサンプルデータが2件分、表示されていればうまくいっています。
<div align="center">
[f:id:koki_matsura:20221102095110p:plain]
</div>

### Selectorの定義
新しいTodoを作成するときに必要となるIDはその時点のtodosが持つTodoの最大のIDにプラス１した値を割り当てます。

Selectorを使って、最大のIDを取り出します。
   
まずは、「recoilKeys.ts」にSelectorのKeyを定義します。
```typescript
//recoilKeys.ts
export const SelectorKeys = {
  "TODO_MAXID" : "todoMaxId"
}
```

次に、「todoState.ts」に最大IDを取得するSelectorを定義します。
```typescript
//todoState.ts
export const maxIDSelector = selector<number>({
  key: SelectorKeys.TODO_MAXID,
  get: ({get}) => {
    return get(todosState).length ? get(todosState).slice(-1)[0].id : 0
  }
})
``` 
SelectorはAtomを加工して取得する以外に、Atomの値を変更することも可能です。

### Todoの追加機能
送信ボタンを押すと、Todoを追加できるようにします。
手順を説明します。

1. Container内のuseRecoilValueをuseRecoilStateに変更
2. ContainerでAtomにTodoを追加する関数を作成
3. Presenterで送信ボタン押下時に2で作成した関数を実行する
   
「todoContainer.tsx」でuseRecoilValueを取得と変更を共にできるuseRecoilStateに変更します。

useStateと同じ書き方です。
```typescript
//TodoContainer.tsx
const [todos, setTodos] = useRecoilState(todosState)
```

AtomにTodoを追加する関数「addTodo」を作成します。また、この際に先ほど作成したmaxIDSelectorを使います。

下記のコードを追加します。
```typescript
//TodoContainer.tsx
const maxID = useRecoilValue(maxIDSelector);

const addTodo = (title: string, content: string) => {
  const newTodo: Todo= {
    id : maxID+1,
    title: title,
    content: content,
    isCompleted: false
  }
  setTodos([...todos, newTodo])
}
```
Selectorの使い方はAtomと同じです。今回は取得のみなので、useRecoilValueにしました。

今までの状態管理ライブラリでは、dispatchでReducerにActionを送っていましたが、RecoilはsetTodosに新しい状態を格納するだけで更新できます。

argsにaddTodo関数を追加して、「TodoPresenter.tsx」に渡しましょう。 「TodoPresenter.tsx」では、送信ボタンを押下時にaddTodo関数を実行するようにしたいです。

なので、addTodo関数を実行し、その後に入力内容を空にするsendTodo関数を作成します。その関数を送信ボタン押下時に実行させるように下記のコードを「TodoPresenter.tsx」に追加します。

```typescript
//TodoPresenter.tsx
const sendTodo = () => {
  addTodo(title, content);
  setTitle("");
  setContent("");
}
//省略

<button type="button" onClick={() => addTodo(title, content)}>送信</button>
```

Todoを追加できるようになっていれば問題ありません。

### Todoの削除機能
それぞれのTodoについている削除ボタンを押すと、リストから削除されるようにします。

AtomからTodoを削除する関数「addTodo」を作成します。

下記のコードを追加します。
```typescript
//TodoContainer.tsx
const removeTodo = (id: number) => {
  setTodos(todos.filter((todos) => todos.id !== id))
}
```
フィルターを用いて、対象のIDをもつTodoだけを弾いた新たなtodosを格納させるコードにしました。

argsにremoveTodo関数を渡して、「TodoPresenter.tsx」では、削除ボタンを押したときに削除したいTodoのidを引数にしてremoveTodo関数を実行するようにします。

下記のように「TodoPresenter.tsx」の削除ボタンを変更してください。

```typescript
//TodoPresenter.tsx
<button type='button' onClick={() => removeTodo(todo.id)}>削除</button>
```

削除ボタンを押すことでTodoを削除できるようになっているかと思います。

### 完了・未完了の切り替え機能
それぞれのTodoについている完了ボタンを押すと、タイトルの横の「未完了」テキストが「完了」テキストになるようにします。また、完了ボタンは「戻る」というテキストのボタンに変化します。

この戻るボタンを押すと、完了ボタンとは逆の操作をします。

「TodoPresenter.tsx」の完了ボタンとタイトル横のテキストのコードを見てみると、todo.isCompletedで切り替えられることがわかります。

なので、isCompletedを切り替えられる関数を作りましょう。
```typescript
//TodoPresenter.tsx
<div>{todo.title} : {todo.isCompleted ? "完了" : "未完了"}</div>
<div>内容：{todo.content}</div>
<button type='button'>{todo.isCompleted ? "戻す" : "完了"}</button>
```

「todoContainer.tsx」に完了・未完了を切り替える関数「toggleComplete」を作成します。

下記のコードを追加します。
```typescript
//TodoContainer.tsx
const toggleComplete = (id: number) => {
  const newTodos = todos.map(todo => 
    todo.id === id 
    ? {...todo, isCompleted: !todo.isCompleted}
    : todo
  )
  setTodos(newTodos)
}
```

argsにtoggleComplete関数を渡して、「TodoPresenter.tsx」では、完了ボタンを押したときに対象のTodoのidを引数にしてtoggleComplete関数を実行するようにします。

下記のように「TodoPresenter.tsx」の完了ボタンを変更してください。
```typescript
//TodoPresenter.tsx
 <button type='button' onClick={() => toggleComplete(todo.id)}>{todo.isCompleted ? "戻す" : "完了"}</button>
```
完了ボタンを押すと、それぞれのTodoタイトルの横の「未完了」が「完了」に切り替わることが確認できると思います。

##　終わりに
Recoilを用いたTodoアプリの作成を通して、基本的な使い方や仕組みをご紹介させていただきました。

Reduxのように一箇所に状態を集めて管理する方法ではなく、AtomやSelectorという単位で状態を管理することで更新のたびにアプリケーション全体の状態を上書きする必要がなくなりました。

また、状態の操作をReducerではなく、Hooks APIを使って行うのでState側で定義することがかなり減ったと思います。

ただし、懸念点として小規模なアプリケーションではかなり使いやすいですが、大規模なアプリケーションになるとContainer側で状態を操作できるというのは意図しない状態更新を行うことを可能にしてしまうということです。

そのため、直接AtomやSelectorを操作するのではなく、カスタムフックを用いて操作するなどの対策をとることで大規模なアプリケーションでも安全に使えるのかなと思います。

ここまで読んでいただきありがとうございました。
この記事がRecoilを使いたい方や、Reactの状態管理ライブラリについて知りたい方の助けになれれば幸いです。

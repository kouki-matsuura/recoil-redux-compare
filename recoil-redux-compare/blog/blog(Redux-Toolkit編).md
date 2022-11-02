こんにちは！ラクス入社1年目のkoki_matsuraです。

本日は、Redux-Toolkitの基本的な状態管理や仕組みをTodoアプリ作成を通して、ご紹介させていただきます。

Reactの状態管理ライブラリを勉強している方、状態管理ライブラリについて簡単に知りたい方などのお役に立てればなと書かせていただきました。

アジェンダは以下の通りです。

[:contents]

## Redux-Toolkitとは

### 概要
名前の通り、Reduxを用いた開発を効率的に行うためのツールキットです。

Reduxと比べて、最大のメリットはコード量が減ることです。詳しくは下の構成図で説明させていただきます。他にも、可読性が上がることもやTypeScriptとの相性がいいこともメリットです。

Reduxの公式はRedux-Toolkitの記述法を標準にしてほしく、使用することを強く勧めています。

今後、Reduxを導入したい方はRedux-Toolkitで始めると簡単に状態管理できると思われます。

### 構成図
Redux-Toolkitでは下図のように状態管理をしています。
<div align="center">
[f:id:koki_matsura:20221102094715p:plain]
</div>

Reduxと比べると、少しシンプルになっているのがわかります。具体的にいうと、ActionCreatorがなくなりました。実際になくなっている訳ではないのですが、ユーザが意識する必要がなくなりました。

また、それぞれの機能をSliceという単位で切り分けます。Sliceの中には機能ごとのState、Reducerを管理することができるので、Reduxと比べて、管理する状態が増えてもコードの見通しが悪くなりにくいです。

Sliceの中にActionCreatorもあるのですが、先ほども書いた通り、意識する必要がなくなるので省いています。


Redux-Toolkitの良さはこれだけでも十分なのですが、個人的に一番メリットに感じているのはStateのイミュータブル性を意識しなくていいことです。ReduxではStateの更新方法が直接変更するのではなく、新しいStateを作り出して返すというものでコードで書いてみると躓きやすいです。ですが、イミュータブル性を意識しなくていいのでStateを直接変更するような方法で更新することが可能になります。

これに関しては、実際にコードを書くと有り難みが身に沁みます...。

## Todoアプリ作成

### 作成する前に

#### 仕様説明
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

#### プロジェクト作成

プロジェクトの作成は下記のコマンドを入力します。

私はプロジェクト名を「redux-todo」としましたが、お好きなプロジェクト名をつけていただいて問題ありません。
```bash
npx create-react-app [プロジェクト名] --template typescript

```

### Redux-ToolkitによるTodoアプリの作成

#### 初期設定

Redux-Toolkitを用いて、開発するには「react-redux」「@reduxjs/toolkit」を入れなければなりません。

下記のコマンドでプロジェクトに入り、それらのライブラリを入れます。
```bash
  cd redux-toolkit-todo
  npm i react-redux @reduxjs/toolkit
```


#### ディレクトリ構成

Redux-Toolkitを用いた時のsrcは以下のようなディレクトリ構成にします。
<div align="center">
[f:id:koki_matsura:20221102095233p:plain]
</div>

appディレクトリとcommonディレクトリ、featuresディレクトリ、featuresディレクトリの中にtodosディレクトリを作成します。

- appディレクトリ

  - App.tsxを移動
  - store.tsを新規作成

「App.tsx」を移動させた理由として、ReduxのStoreにアクセスできるのはProviderで囲われたコンポーネントだけで、「App.tsx」の中身を囲って、Todoアプリ全体で状態を共有したかったからです。同じディレクトリに移動させることでどのコンポーネントでProviderが使われているか分かりやすくなります。

- commonディレクトリ
  - todo.type.tsの新規作成
  - rootState.type.tsの新規作成

「todo.type.ts」は今回のTodoアプリで出てくるTodoのタイプを定義し、「rootState.type.ts」には現在のStateのタイプを定義しています。色々なファイルから使われると思われるのでcommonディレクトリに作成しました。

- features/todosディレクトリ
  - todoSliceの新規作成
  - TodoContainer.tsxの新規作成
  - TodoPresenter.tsxの新規作成

Reduxと違う構成をしているのはtodosディレクトリ内だけです。

「todoSlice.ts」はReduxで言うと、State・Reducer・Actionを一つにまとめたようなものです。

「TodoContainer.tsx」はTodoアプリのロジック部分を、「TodoPresenter.tsx」は表示部分を担当します。

### Todo型の定義
「todo.type.ts」にTodo型を記述します。

```typescript
//todo.type.ts
export type Todo = {
    id : number,
    title : string,
    content : string,
    isCompleted : boolean
}
```
### Sliceの定義

Sliceを定義していきます。

Sliceの中にはState、Reducer、Actionを記述します。
Stateには適当なデータを2つ入れておきます。

基本的な書き方は以下のようになります。
```typescript
//todoSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../common/todo.type";

const state = {
  todos: [ 
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
  ] as Todo[]
}

export const todoSlice = createSlice({
    name: 'todoSlice',
    initialState: state,
    reducers:{
        //Actionを記述する
    }
})
```
createSlice関数に、「name」、「initialState(State)」、「reducer」をオブジェクトにして渡しています。

「name」というのは、Reduxでは出てこなかったのですが、Sliceの名前を示します。また、Actionのタイプのprefixとして用いられます。

なので、Redux-ToolkitではあまりActionのタイプを意識する必要がなくなるのです。

これで最も基本的なSliceを定義できます。

### Storeの定義
Sliceを定義できたので、次はStoreを定義していきます。

Storeの定義方法もReduxとは少し変わってきます。
次のようにして、作成できます。

```typescript
//store.ts
import { configureStore } from "@reduxjs/toolkit"
import { todoSlice } from "../features/todos/todoSlice"

export const store = configureStore({
    reducer : todoSlice.reducer
})
```
configureStore関数の中でreducerにtodoSlice内のReducerを渡すことで登録できます。

configureStore関数に登録するReducerが単数の場合は、それがStoreのルートリデューサーとなります。

複数の場合は、combineReducersでReducerをまとめてから登録することをお勧めします。

また、configureStore関数にはreducer以外にも、middleware、devTools、preloadedState、enhancersもオプションとしてあります。

### TodoContainer.tsxの定義

Slice側は仮ではありますが実装できたので、TodoContainer.tsxを定義します。

このファイルではTodoアプリのロジック部分を担当します。

RootState型とTodoPresenterはまだ定義していないのでエラーが出ていても問題ありません。
```typescript
//TodoContainer.tsx
import { useSelector } from "react-redux"

export const TodoContainer = () => {
    const todos = useSelector((state : RootState) => state.todos)

    const args = {
        todos,
    }
    return <TodoPresenter {...args} />
}
```
「rootState.type.ts」に下記のようにRootState型を定義します。
```typescript
//rootState.type.ts
import { store } from "../app/store";

export type RootState = ReturnType<typeof store.getState>
```
「store.getState」はインポートしたStoreから全てのStateを取得できます。その型をRootStateに入れています。

今回の場合はtodosのみを管理しているためToDoのリスト型でも問題はなかったのですが、管理する状態が複数になった時のためにこのような型を紹介させていただきました。

この型を「TodoContainer.tsx」にインポートすれば、RootStateのエラーは消えます。

### TodoPresenter.tsxの定義

このアプリではTodoアプリの表示部分を担当します。
Todoリストを表示します。 まずは、色々な機能を作る前に基盤を作りたいので下記のようなコードにします。
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

### Providerの定義
Stateを使いたいルートコンポーネントを囲う形で使います。

TodoContainerをルートコンポーネントにStateを使いたいので、「App.tsx」を次のように書き換えます。

```typescript
//App.tsx
import { Provider } from "react-redux";
import { TodoContainer } from "../features/todos/TodoContainer";
import { store } from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TodoContainer />
      </Provider>
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

### Todoの追加機能
送信ボタンを押すと、Todoを追加できるようにします。

手順を説明します。

1. SliceでTodo追加ActionをReducersに加え、そのActionをエクスポート
2. ContainerでTodo追加Actionをインポートし、そのActionに追加したいTodoを入れて、Sliceに流す関数を作成
3. Presenterで送信ボタン押下時に2で作成した関数を実行する

早速、実装していきます。

Todo追加Actionは「add」という名前にします。
「todoSlice.ts」のsliceのreducersを下記のように書き換えてください。
```typescript
//todoSlice.ts
reducers: {
        add: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload)
        }
    }
```
Reduxとかなり違った書き方をしたと思いますが、ReduxのReducerとの大きな違いは以下2つが挙げられます。

**・　Switch文による分岐**

Reduxではdispatchにより送られてくるActionのタイプをSwitch文で分岐させていたのですが、Redux-ToolkitではSwitchが文を書かなくても問題ありません。

**・　イミュータブル性**

Reduxは原則としてStateの値は変更してはならず、前のStateにActionを施したオブジェクトを返す仕組みでした。今回のようなオブジェクトだとそれほど苦労しませんが、ネストが深いオブジェクトの場合はかなり苦労します。

ですが、Redux-ToolkitではImmerというライブラリがオブジェクトの変更をイミュータブルにしてくれるので、直接変更するような書き方で問題ありません。


addActionを作成できたので、エクスポートします。「todoSlice.ts」の最後尾に次のコードを追加します。
```typescript
//todoSlice.ts
export const { add } = todoSlice.actions
```
Sliceで追加する処理は書けたので、Containerでの処理を書いていきます。

「todoContainer.tsx」でエクスポートしたaddActionをインポートし、addActionに追加したいTodoを加えて、Sliceに流す関数を作成します。
todosとargsの間に加えてください。
```typescript
//todoContainer.tsx
const maxID = todos.length ? todos.slice(-1)[0].id : 0;
const dispatch = useDispatch();
    
const addTodo = (title: string, content: string) => {
    const newTodo : Todo = {
        id: maxID+1,
        title: title,
        content: content,
        isCompleted: false,
    }
    dispatch(add(newTodo))
}
```
maxIDはTodoリストの最大のIDを取得してきます。もし、Todoが0個の場合は0を返すようにします。

argsにaddTodo関数を追加して、「TodoPresenter.tsx」に渡しましょう。
「TodoPresenter.tsx」では、送信ボタンを押下時にaddTodo関数を実行するようにしたいです。

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

ReduxのTodoアプリ同様の操作でTodoを追加できるようになっているかと思います。

### Todoの削除機能
追加処理と仕組みは同じです。

それぞれのTodoについている削除ボタンを押すと、リストから削除されるようにします。

Todo削除Actionは「remove」という名前にします。
「todoSlice.ts」のsliceのreducersにremoveActionを書き加え、そのActionをエクスポートします。
```typescript
//todoSlice.ts
remove: (state, action: PayloadAction<number>) => {
    state.todos = state.todos.filter((todo) => todo.id !== action.payload)
}

//省略

export const { add, remove } = todoSlice.actions
```

「TodoContainer.tsx」にaddTodo関数と同様にremoveActionをインポートし、このActionをSliceに流すremoveTodo関数を作成します。
```typescript
//TodoContainer.tsx
const removeTodo = (id: number) => {
    dispatch(remove(id))
}
```
argsにremoveTodo関数を渡して、「TodoPresenter.tsx」では、削除ボタンを押したときに削除したいTodoのidを引数にしてremoveTodo関数を実行するようにします。

下記のように「TodoPresenter.tsx」の削除ボタンを変更してください。
```typescript
//TodoPresenter.tsx
<button type='button' onClick={() => removeTodo(todo.id)}>削除</button>
```
ReduxのTodoアプリ同様の操作でTodoを削除できるようになっているかと思います。

### 完了・未完了の切り替え機能
それぞれのTodoについている完了ボタンを押すと、タイトルの横の「未完了」テキストが「完了」テキストになるようにします。また、完了ボタンは「戻る」というテキストのボタンに変化します。
この戻るボタンを押すと、完了ボタンとは逆の操作をします。

今回も手順は同じです。まずは、Sliceのreducersに完了・未完了切り替えActionを作ります。

「updateComplete」という名前にします。Container側から対象のTodoのIDが送られてくることを想定して下記のようにします。

また、エクスポートもしておきます。
```typescript
//todoSlice.ts
updateComplete: (state, action: PayloadAction<number>) => {
    state.todos = state.todos.map((todo) => todo.id === action.payload
    ? {...todo, isCompleted: !todo.isCompleted}
    : todo)
}

//省略

export const { add, remove, updateComplete } = todoSlice.actions
```
「TodoContainer.tsx」にtoggleCompleteActionをインポートし、このActionをSliceに流すtoggleComplete関数を作成します。
```typescript
//TodoContainer.tsx
const toggleComplete = (id: number) => {
    dispatch(updateComplete(id));
}
```
argsにtoggleComplete関数を渡して、「TodoPresenter.tsx」では、完了ボタンを押したときに対象のTodoのidを引数にしてtoggleComplete関数を実行するようにします。

下記のように「TodoPresenter.tsx」の完了ボタンを変更してください。
```typescript
//TodoPresenter.tsx
 <button type='button' onClick={() => toggleComplete(todo.id)}>{todo.isCompleted ? "戻す" : "完了"}</button>
```
完了ボタンを押すと、それぞれのTodoタイトルの横の「未完了」が「完了」に切り替わることが確認できると思います。

### まとめ
Redux-Toolkitを用いたTodoアプリの作成が終わりました。

Reduxと比べると、State・Reducer・ActionをSliceで管理するというのが特徴的だったと思います。また、そのおかげでファイル数も少なく、記述量も少なくなりました。

Stateの更新もミュータブルにできるので単純で分かりやすい印象を受けました。

公式がReduxよりもRedux-Toolkitをお勧めする理由もわかります。

### 終わりに

Todoアプリを通して、Redux-Toolkitの基本的な仕組みや特徴を紹介させていただきました。

Reduxについてまとめた記事もあるので読んでいただけると幸いです。
より、Redux-Toolkitの使いやすい部分が分かっていただけると思います。
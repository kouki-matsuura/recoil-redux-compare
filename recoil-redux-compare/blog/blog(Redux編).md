こんにちは！ラクス入社1年目のkoki_matsuraです。

本日は、Reduxの基本的な状態管理や仕組みをTodoアプリ作成を通して、ご紹介させていただきます。

Reactの状態管理ライブラリを勉強している方、状態管理ライブラリについて簡単に知りたい方などのお役に立てればなと書かせていただきました。

アジェンダは以下の通りです。

[:contents]
## Reduxとは

### 概要
JavascriptによるSPAは複雑化し続けており、Reactが導入され、Viewとロジック部分を切り離せはしましたが、State（状態）の管理は開発者に委ねられています。
Reduxでは、このStateの問題に下記の3原則を取り入れ、状態変化の流れを制限することで解決します。

**- Single source of truth (ソースは一つだけ)**
  
  アプリケーションの状態は一つのStore内に一つのオブジェクトでツリー型で格納されます。

  状態が一つのStoreで管理されるため、デバッグや開発が簡単になります。

** - State is read-only (状態は読み取り専用)**

  状態を変更できるのはActionを持ったオブジェクトのみです。つまり、ビューやコールバックが状態を直接的に変更することはできません。

**- Changes are made with pure functions (変更は純粋関数で行われる)**
  
  アクションがどのようにStateを変更するかはReducerに記述されます。

  Reducerは前のStateとActionより、次の状態を返す、副作用のない純粋な関数です。注意点として、状態を変更しているのではなく、新しい状態を返しています。

  また、開発の際にはアプリケーションで一つのReducerを用意しておき、巨大化してくればReducerを分割することもできます。ただ、分割方法はユーザで決めなければならないのが欠点かもしれません。

### 構成図
  下図はReduxがどのように状態管理をしているかを簡単に示したものになっています。本来であれば、ComponentとReducerの間にはAPIなどの処理を行うMiddlewaresが挟まりますが、今回は省かせていただきました。
  
<div align="center">
[f:id:koki_matsura:20221102094542p:plain]
</div>

  ComponentはユーザーのイベントからActionCreatorにActionの生成を依頼し、生成されたActionをReducerに対し、dispatchします。Reducerは前回のStateとdispatchされたActionから新たなStateを作り出し、それをStateに返します。StateはComponentに対して、更新を通知し、新しいStateを取得するという流れになっています。

  また、Reduxが参考にしているFluxというデザインパターンではActionCreatorがActionの生成・Actionのdispatchまでを担当するのが一般的なのですが、ReduxではテストのしやすさからActionCreatorはActionを生成をするだけの役割の方がいいかもしれません。

## Todoアプリ作成

### 作成する前に

#### 仕様説明
それぞれの状態管理ライブラリでTodoアプリを作成する前にTodoアプリの仕様と構成を説明します。

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
### ReduxによるTodoアプリの作成
#### 初期設定
プロジェクト作成後、Reduxを使うために必要になるので、下記のコマンドで作成したプロジェクトに移動して、reduxとreact-reduxをインストールします。

```bash
cd redux-todo
npm i redux react-redux
```
#### ディレクトリ構成
Reduxを使う準備もできましたので、次はディレクトリを構成します。

Reduxにおけるディレクトリ構成は様々ありますが、今回は役割がわかりやすいように「store」「action(actionCreator)」「state」「reducer」に分けた構成にします。

「src」ディレクトリ以外は特に触らないので、「src」以下の画像を載せます。
<div align="center">
[f:id:koki_matsura:20221102095000p:plain]
</div>
appディレクトリとcommonディレクトリ、featuresディレクトリ、featuresディレクトリの中にtodosディレクトリを作成します。

- appディレクトリ

  - App.tsxを移動
  - store.tsを新規作成

App.tsxを移動させた理由として、ReduxのStoreにアクセスできるのはProviderで囲われたコンポーネントだけで、「App.tsx」の中身を囲って、Todoアプリ全体で状態を共有したかったからです。同じディレクトリに移動させることでどのコンポーネントでProviderが使われているか分かりやすくなります。

- commonディレクトリ
  - todo.type.tsの新規作成
  - rootState.type.tsの新規作成

「todo.type.ts」は今回のTodoアプリで出てくるTodoのタイプを定義し、「rootState.type.ts」には管理している全てのStateのタイプを定義しています。色々なファイルから使われると思われるのでcommonディレクトリに作成しました。

- features/todosディレクトリ
  - todoAction.tsの新規作成
  - todoReducer.tsの新規作成
  - todoState.tsの新規作成
  - TodoContainer.tsxの新規作成
  - TodoPresenter.tsxの新規作成

「todoAction.ts」は構成図で表すと、ActionCreatorの役割を果たします。

「todoState.ts」は状態の定義、「todoReducer.ts」はActionを受けて、状態を変更する役割を果たします。

「TodoContainer.tsx」はTodoアプリのロジック部分を、「TodoPresenter.tsx」は表示部分を担当します。
#### Stateの定義
最初はStateを定義します。

Stateは状態のことです。

StateはTodoのリストを管理するので、Todo型の配列を初期値にします。

Todo型はまだ定義していないので、「todo.type.ts」に下記のように定義します。
```typescript
//todo.type.ts
export type Todo = {
    id : number;
    title : string;
    content : string;
    isCompleted : boolean;
}
```
それぞれのTodoは「id」「title」「content」「isCompleted」を持ちます。

Todo型を定義できたので、Stateを「todoState.ts」に下記のように定義します。

適当なデータを2つ入れておきます。
```typescript
//todoState.ts
import { Todo } from "../../common/todo.type";

export const state = {[
        {
        id: 1,
        title: "テスト1",
        content: "テスト1の内容",
        isCompleted: false
        },{
        id: 2,
        title: "テスト2",
        content: "テスト2の内容",
        isCompleted: false
        }
    ] as Todo[]}
```

#### Reducerの定義
Stateが定義できたので、Reducerを定義します。

今回のTodoアプリの仕様では、「追加」「削除」「完了・未完了のスイッチ」の機能が必要ですが、一旦、何もしないReducerにしておきます。

```typescript
//todoReducer.ts
import { state as initialState } from "./todoState";

export const todosReducer = (state = initialState, action: any) => {
    return state
}
```
Reducerでは、第一引数に前のState、第二引数にActionを受け取ります。

ActionはActionCreatorで作成されるもので「type」を必ず持っており、必要に応じて、「payload」を持ちます。

#### Storeの定義

状態管理の元となるStoreを定義します。「store.ts」に下記のように書きます。

```typescript
//store.ts
import { legacy_createStore as createStore } from 'redux'
import { todosReducer } from '../features/todos/todoReducer'

export const store = createStore(todosReducer)
```
createStoreに引数でReducerを入れることでstoreが出来上がります。

**注意点**：

現在、createStoreは公式から推奨されていないので、1文目のインポート文を入れないとエラーが起きます。

#### ActionCreatorの定義

ActionCreatorは名前の通り、Actionを作る役割をします。

Actionを作る役割と言っても、typeとpayloadをオブジェクトで返すだけです。

typeの名前とpayloadの型がReducerのものと合わせる必要がありますが、まだReducerの方で処理を書いていないので、こちらを基準にしていきます。

下記のようにしましょう。
```typescript
//todoAction.ts
import { Todo } from "../../common/todo.type";
/** Todoを加えるアクションを返す */
export const addTodoAction = (newTodo : Todo) => {
    return {
        type: "ADD",
        payload: newTodo
    }
}
/** Todoを変更するアクションを返す */
export const toggleCompleteAciton = (id : number) => {
    return {
        type: "TOGGLE_COMPLETE",
        payload: id
    }
}
/** Todoを削除するアクションを返す */
export const removeTodoAction = (id : number) => {
    return {
        type: "REMOVE",
        payload: id
    }
}
```

#### TodoContainer.tsxの定義
このファイルではTodoアプリのロジック部分を担当します。

useSelectorを使うことでStateを取得できます。Stateの型はRootStateという名前にします。

RootStateとTodoPresenterはまだ定義していないためエラーが出ていても問題ありません。
```typescript
//TodoContainer.tsx
import { useSelector } from "react-redux"

export const TodoContainer = () => {
    const todos = useSelector((state: RootState) => state.todos)

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

このRootState型をTodoContainerにインポートすれば、型エラーはなくなります。

#### TodoPresenter.tsxの定義
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

#### Providerの設定
必要なファイルはすべて完了しました。しかし、これだけでは状態を管理できません。

ReduxではStateを共有したいコンポーネントをProvdierで囲むことで機能します。

今回の場合では、TodoContainer内だけでStateを共有したいです。

なので、「App.tsx」の元のコードを消して、次のようなコードに変えてください。
```typescript
//App.tsx
import React from 'react';
import { Provider } from 'react-redux'
import { store } from "./store"
import { TodoContainer } from '../features/todos/TodoContainer';
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
これでTodoContainer内でStateの情報を共有できるようになりました。

#### アプリの起動

下記のコマンドで起動してみましょう。
```bash
npm start
```
自動で開くと思いますが、開かない方は「http://localhost:3000/」にアクセスしてください。

次のようにStateを定義したときに入れたサンプルデータが2件分、表示されていればうまくいっています。
<div align="center">
[f:id:koki_matsura:20221102095110p:plain]
</div>

#### Todoの追加機能
送信ボタンを押すと、Todoを追加できるようにします。

手順を説明します。

1. ContainerでTodoを加えるActionをReducerに流す関数を作成
2. Presenterで送信ボタン押下時に1で作成した関数を実行するコードを加える
3. ReducerでActionに応じた処理をするコードを加える

Todoを加えるActionをReducerに流す関数の名前は「addTodo」にします。次のコードを「TodoContainer.tsx」のtodosとargsの間に加えてください。
```typescript
//TodoContainer.tsx
const maxID = todos.length ? todos.slice(-1)[0].id : 0;
const dispatch = useDispatch();

const addTodo = (title: string, content: string) => {
    const newTodo : Todo = {
        id: maxID+1,
        title: title,
        content: content,
        isCompleted: false
    }
    dispatch(addTodoAction(newTodo));
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
これで、送信ボタンを押下時に、addTodo関数を実行できます。

ReducerでこのAction(type: "ADD", payload: newTodo)に合う処理を書きます。

「todoReducer.ts」を次のように書き換えます。
```typescript
//todoReducer.ts
export const todosReducer = (state = initialState, action : any) => {
    switch (action.type) {
        case "ADD":
            return { todos: [...state.todos, action.payload] }
        default:
            return state;
    }
}
```
Reducerでは、action.typeを見て、処理を変えます。

action.typeは「todoAction.ts」で定義したものと一致させないといけません。

また、注意点としてReduxの原則にも書いてありますが、Stateを直接変更するのではなく、前のStateとActionから新しいStateを作り出すようにします。これが個人的に少し躓きやすい点かなと思います。

これで、追加の処理が書けました。実際に、入力部にタイトルと内容を入力して送信ボタンを押すと、既存のリストの下に追加されていることが確認できると思います。

#### Todoの削除機能
追加処理と仕組みは同じです。

それぞれのTodoについている削除ボタンを押すと、リストから削除されるようにします。

「TodoContainer.tsx」にaddTodo関数と同様にremoveTodo関数を次のように作ります。
```typescript
//TodoContainer.tsx
const removeTodo = (id: number) => {
        dispatch(removeTodoAction(id))
    }
```
argsにremoveTodo関数を渡して、「TodoPresenter.tsx」では、削除ボタンを押したときに削除したいTodoのidを引数にしてremoveTodo関数を実行するようにします。

下記のように「TodoPresenter.tsx」の削除ボタンを変更してください。
```typescript
//TodoPresenter.tsx
<button type='button' onClick={() => removeTodo(todo.id)}>削除</button>
```
削除ボタン押下時に、removeTodoが実行されるようになったので、ReducerでこのAction(type: REMOVE, payload: id)に合う処理を書きます。

次のようにswitch分にcaseを増やすような形で書いてください。
```typescript
//todoReducer.ts
case "REMOVE":
    return {todos : state.todos.filter((todo) => todo.id !== action.payload)}
```
これで、削除ボタンを押すと、該当のTodoがリストから消えるようになります。

#### 完了・未完了の切り替え機能
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
まずは、「TodoContainer.tsx」にtoggleComplete関数を次のように作ります。
```typescript
//TodoContainer.tsx
const toggleComplete = (id: number) => {
    dispatch(toggleCompleteAciton(id))
}
```
argsにtoggleComplete関数を追加し、下記のように「TodoPresenter.tsx」の完了ボタンを押下時にtoggleComplete関数が実行するようにします。
```typescript
//TodoPresenter.tsx
<button type='button' onClick={() => toggleComplete(todo.id)}>{todo.isCompleted ? "戻す" : "完了"}</button>
```
最後はReducerでActionを受け取り、isCompletedを切り替える処理を書きましょう。

次のコードをswitch文のcaseとして追加することで実装できます。
```typescript
//todoReducer.ts
case "TOGGLE_COMPLETE":
    return { todos: state.todos.map((todo) => {
        if (todo.id !== action.payload) return todo
        
        return {...todo, isCompleted : !todo.isCompleted}
    })}
```
完了ボタンを押すと、それぞれのTodoタイトルの横の「未完了」が「完了」に切り替わることが確認できると思います。

#### まとめ
これで仕様通りのTodoアプリをReduxを使って作成できました。

かなり定義するものが多く、ファイル数が多いなと思われたのではないでしょうか。
私自身も、最初使った時はそのように感じました。

Todoアプリのように小さい規模のものだとReduxは少し冗長的で面倒に感じるのですが、大きな規模のアプリになっていくと、それぞれの役割に細かく分けている構成の恩恵を受けやすくなるのかもしれません。

また、今回はそれぞれの役割が分かりやすくなるようにわざとファイルを細かく分けていたのですが、StateとAction、Reducerは密な関係になることが多いので、一つのファイルで管理することもあります。

### 終わりに

Todoアプリを通して、Reduxの基本的な仕組みや特徴を紹介させていただきました。

Redux-ToolkitやRecoilについても同じような内容で記事を上げる予定なので読んでいただけると幸いです。




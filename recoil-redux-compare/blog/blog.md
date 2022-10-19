# Reactの状態管理のモダン化 -Redux・Redux-toolkitからRecoilへの導入-

こんにちは！ラクス入社1年目のkoki_matsuraです。

本日は、Reactの代表的な状態管理ライブラリの一つでもあるReduxまたは、Redux-toolkit
からRecoilへの書き換えを簡単なTodoアプリを通して紹介できればと思います。

アジェンダは以下の通りです。

- [Reactの状態管理のモダン化 -Redux・Redux-toolkitからRecoilへの導入-](#reactの状態管理のモダン化--reduxredux-toolkitからrecoilへの導入-)
  - [なぜ、Redux-toolkitからRecoilへ？](#なぜredux-toolkitからrecoilへ)
  - [Reduxとは](#reduxとは)
    - [概要](#概要)
    - [構成図](#構成図)

## なぜ、Redux-toolkitからRecoilへ？

僕が所属しているフロントエンド開発課ではReactにおける状態管理ライブラリにRedux-toolkitを用いていました。

しかし、以下の3点の理由により状態管理ライブラリをRecoilへ移行することになりました。

- Reduxは定義することが多く面倒である
  
  Reduxを用いて、Stateの状態を書き換えるにはActioncreator、Action、Reducer、Storeを定義、APIを用いるときはMiddlewareも追加で定義しなければなりません。

  特に、フラグのようなものだけを管理するStateがあったとき、フラグを変えるためだけに ActionからReducerを定義するのはあまりにも面倒だとわかります。

- 状態の流れを追うのが難しい
  
  ユーザのイベントからActioncreator、Action、Reducerを通り、古い情報とActionから新しい情報を返すという単方向の流れでもRecoilと比べると、追うのが難しいです。

- 新しいものを使いたい
  
  Recoilは現時点で実験的な状態管理ライブラリであるが、Reduxと比べ、構造が単純で扱いやすい点、Hooksとの相性がいい点などに加え、今後、主流のライブラリになる可能性があるため、取り入れました。

## Reduxとは
### 概要
JavascriptによるSPAは複雑化し続けており、Reactが導入されても、state（状態）の管理は開発者に委ねられています。

Reduxでは、このstateの問題に下記の3原則を取り入れ状態変化の流れを制限することで解決します。

- Single source of truth (ソースは一つだけ)
  
  アプリケーションの状態は一つのstore内に一つのオブジェクトでツリー型で格納されます。

  状態が一つのstoreで管理されるため、デバッグや開発が簡単になります。

- State is read-only (状態は読み取り専用)

  状態を変更できるのはactionを持ったオブジェクトのみです。つまり、ビューやコールバックが状態を直接的に変更することはできません。

- Changes are made with pure functions (変更は純粋関数で行われる)
  
  アクションがどのようにstateを変更するかはreducerに記述されます。

  reducerは前のstateとactionより、次の状態を返す、副作用のない純粋な関数です。注意点として、状態を変更しているのではなく、新しい状態のオブジェクトを返しています。

  また、開発の際にはアプリケーションで一つのreducerを用意しておき、巨大化してくればreducerを分割することもできます。

### 構成図
  
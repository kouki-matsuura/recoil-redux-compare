import React from 'react';
import { RecoilRoot } from 'recoil';
import { TodoListContainer } from './features/todos/container/TodoListContainer';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <TodoListContainer />
      </RecoilRoot>
    </div>
  );
}

export default App;

import React from 'react';
import { RecoilRoot } from 'recoil';
import { SamplePresenter } from './features/todos/SamplePresenter';
import { TodoInputContainer } from './features/todos/TodoInputContainer';
import { TodoOutputContainer } from './features/todos/TodoOutputContainer';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <TodoInputContainer />
        <TodoOutputContainer />
        <SamplePresenter />
      </RecoilRoot>
    </div>
  );
}

export default App;

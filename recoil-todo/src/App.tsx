import React from 'react';
import { RecoilRoot } from 'recoil';
import { SamplePresenter } from './features/todos/SamplePresenter';
import { TodoContainer } from './features/todos/TodoContainer';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <TodoContainer />
        <SamplePresenter />
      </RecoilRoot>
    </div>
  );
}

export default App;

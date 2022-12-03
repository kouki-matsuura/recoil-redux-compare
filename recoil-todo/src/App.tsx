import React from 'react';
import { RecoilRoot } from 'recoil';
import { TodoContainer } from './features/todos/container/TodoContainer';
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

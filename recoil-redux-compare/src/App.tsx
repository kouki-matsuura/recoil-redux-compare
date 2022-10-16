import React from 'react';
import './App.css';
import { TodoContainerRedux } from './features/todo_redux-toolkit/todoContainerRedux';

function App() {
  return (
    <div className="App">
     <TodoContainerRedux />
    </div>
  );
}

export default App;

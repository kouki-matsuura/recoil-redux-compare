import React from 'react';
import './App.css';
import { Counter } from './features/counter/counter';
import { TodoContainerRedux } from './features/todo_redux/todoContainerRedux';

function App() {
  return (
    <div className="App">
     <TodoContainerRedux />
    </div>
  );
}

export default App;

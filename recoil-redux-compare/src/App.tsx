import React from 'react';
import './App.css';
import { TodoContainerReduxToolkit } from './features/todo_redux-toolkit/todoContainerRedux';
import {reduxStore} from './features/todo_redux/store'
import { reduxToolkitStore } from './features/todo_redux-toolkit/store';
import { Provider } from 'react-redux';
import { TodoContainerRedux } from './features/todo_redux/todoContainerRedux';

function App() {
  return (
    <div className="App">
      <Provider store={reduxToolkitStore}>
      <TodoContainerReduxToolkit />
      </Provider>
      <Provider store={reduxStore}>
        <TodoContainerRedux />
      </Provider>
    </div>
  );
}

export default App;

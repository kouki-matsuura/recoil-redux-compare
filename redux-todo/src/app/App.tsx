import React from 'react';
import { Provider } from 'react-redux'
import { store } from "./store"
import { TodoContainer } from '../features/todos/todoContainer';
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

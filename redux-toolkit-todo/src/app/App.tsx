import { Provider } from "react-redux";
import { TodoContainer } from "../features/todos/TodoContainer";
import { store } from "./store";

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

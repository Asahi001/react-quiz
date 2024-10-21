import "./App.css";
import Main from "./journey/main";
import { MyProvider } from "./journey/use_context";

function App() {
  return (
    <div className="App">
      <MyProvider>
        <Main />
      </MyProvider>
    </div>
  );
}

export default App;

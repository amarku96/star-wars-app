import "./App.css";
import Characters from "./components/Characters";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>STAR WARS</h1>
      </header>
      <Search></Search>
      <Characters></Characters>
    </div>
  );
}

export default App;

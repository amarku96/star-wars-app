import "./App.css";
import Characters from "./components/Characters";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <h1>STAR WARS</h1>
        </header>

        <Characters></Characters>
      </div>
    </QueryClientProvider>
  );
}

export default App;

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CreatePoll from "./pages/CreatePoll";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/:id/results">
            <h1>Poll Results View</h1>
          </Route>
          <Route path="/:id">
            <h1>Poll Voting View</h1>
          </Route>
          <Route path="/">
            <CreatePoll />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

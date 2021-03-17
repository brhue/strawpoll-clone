import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CreatePoll from "./pages/CreatePoll";
import PollResults from "./pages/PollResults";
import VotePoll from "./pages/VotePoll";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/:id/results">
            <PollResults />
          </Route>
          <Route path="/:id">
            <VotePoll />
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

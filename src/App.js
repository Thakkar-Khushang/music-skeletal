import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/songs/:id" component={Song}></Route>
          <Route path="/search" component={Search}></Route>
          <Route path="/list" component={Search}></Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;

import {Song} from './components/song';
import SearchList from './components/SearchList';
import {SongList} from './components/songList';


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
              <Route path="/songs/:id" component={Song}></Route>
              <Route path="/search" component={SearchList}></Route>
            <Route path="/" component={SongList}></Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;

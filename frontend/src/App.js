
import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import SetDetails from './SetDetails';
import Test from './Test';


function App() {
  return (
    <Router>
      <div className="App">
        {/*Navbar is placed above the switch componet so it can appear on every page*/}
        <Navbar/>
        <div className="content">
          <Switch>

            <Route exact path="/">
              <Home/>
            </Route>

            <Route path="/create">
              <Create/>
            </Route>

            <Route path="/sets/:id">
              <SetDetails/>
            </Route>

            <Route path="/test/:id">
              <Test/>
            </Route>

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

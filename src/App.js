import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './views/Home'
import City from './views/City'
import CityDetail from './views/CityDetail'

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/city" exact>
            <City />
          </Route>
          <Route path="/city/:id">
            <CityDetail />
          </Route>
          <Redirect from="/" to="/home"/>
        </Switch>
    </Router>
  );
}

export default App;

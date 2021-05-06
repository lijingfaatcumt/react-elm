import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './views/Home'
import City from './views/City'
import CityDetail from './views/CityDetail'
import store from './redux'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;


import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path='/register' component={Register} />
    </Switch>
  </Router>
}

export default App;
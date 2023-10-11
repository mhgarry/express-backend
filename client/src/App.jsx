
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path='/register' component={Register} />
    </Switch>
  </Router>
}

export default App;
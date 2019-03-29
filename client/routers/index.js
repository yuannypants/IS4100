import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';

// Import components
import AuthenticatedRoute from './AuthenticatedRoute';
import NotFound from '../components/404';

// Public components
import Login from '../components/Login';
import Register from '../components/Register';
import HomePage from '../components/HomePage';

// Private components
import Home from '../components/Home';
import Page from '../components/Page'

const history = require("history").createBrowserHistory();

const RootClientRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={HomePage}/>

      <AuthenticatedRoute exact path="/Page" component={Page}/>
      <AuthenticatedRoute path="/Page/" component={Page}/>

      <AuthenticatedRoute exact path="/Home" component={Home}/>
      <AuthenticatedRoute path="/Home/" component={Home}/>

      <Route exact path="/Login" component={Login}/>
      <Route exact path="/Register" component={Register}/>
      <Route path="" component={HomePage}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
);

export default RootClientRouter;

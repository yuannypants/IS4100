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
import Developer from '../components/Developer';
import Page from '../components/Page';
import Settings from '../components/Settings';
import Projects from '../components/Projects';
import Sprints from '../components/Sprints';
import AddEditSprint from '../components/AddEditSprint';

const history = require("history").createBrowserHistory();

const RootClientRouter = () => (
  <Router history={history}>
    <Switch>
      // Public facing, no need Authentication!
      <Route path="/" exact component={HomePage}/>
      <Route exact path="/Login" component={Login}/>
      <Route exact path="/Register" component={Register}/>
      
      // Placeholder...
      <AuthenticatedRoute exact path="/Page" component={Page}/>
      <AuthenticatedRoute path="/Page/" component={Page}/>

      // Routes that need authentication
      <AuthenticatedRoute exact path="/Developer" component={Developer}/>
      <AuthenticatedRoute path="/Developer/" component={Developer}/>
      <AuthenticatedRoute exact path="/Settings" component={Settings}/>
      <AuthenticatedRoute exact path="/Projects" component={Projects}/>
      <AuthenticatedRoute exact path="/Sprints" component={Sprints}/>
      <AuthenticatedRoute exact path="/AddEditSprint" component={AddEditSprint}/>
      <AuthenticatedRoute path="" component={HomePage}/>
      <AuthenticatedRoute component={NotFound}/>

    </Switch>
  </Router>
);

export default RootClientRouter;

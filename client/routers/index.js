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
import EditSprint from '../components/EditSprint';
import Task from '../components/Task';
import Tasks from '../components/Tasks';
import ResourceManagement from '../components/ResourceManagement';
import IndustryStats from '../components/IndustryStats';
import Resource from '../components/Resource';


const history = require("history").createBrowserHistory();

const RootClientRouter = () => (
  <Router history={history}>
    <Switch>
      // Public facing, no need for authentication
      <Route path="/" exact component={HomePage}/>
      <Route exact path="/Login" component={Login}/>
      <Route exact path="/Register" component={Register}/>
      
      // Placeholder page
      <AuthenticatedRoute exact path="/Page" component={Page}/>
      <AuthenticatedRoute path="/Page/" component={Page}/>

      // Routes that require authentication
      <AuthenticatedRoute exact path="/Developer" component={Developer}/>
      <AuthenticatedRoute path="/Developer/" component={Developer}/>
      <AuthenticatedRoute exact path="/Settings" component={Settings}/>
      <AuthenticatedRoute exact path="/Projects" component={Projects}/>
      <AuthenticatedRoute exact path="/Sprints" component={Sprints}/>
      <AuthenticatedRoute exact path="/Tasks" component={Tasks}/>
      <AuthenticatedRoute exact path="/EditSprint" component={EditSprint}/>
      <AuthenticatedRoute exact path="/ResourceManagement" component={ResourceManagement}/>
      <AuthenticatedRoute exact path="/IndustryStats" component={IndustryStats}/>
      <AuthenticatedRoute path="" component={HomePage}/>
      <AuthenticatedRoute component={NotFound}/>


    </Switch>
  </Router>
);

export default RootClientRouter;

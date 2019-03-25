import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const storage = window.localStorage;

const AuthenticatedRoute = ({component: Component,  ...rest}) => (
  <Route
    {...rest}
    render = {
      props => (
        storage.getItem("user")!= null ? ( // <------- CHANGE!!!
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: {from: props.location}
          }}/>
        )
      )
    }
  />
);

export default AuthenticatedRoute;
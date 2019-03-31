import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const storage = window.localStorage;

const AuthenticatedRoute = ({component: Component,  ...rest}) => (
  <Route
    {...rest}
    render = {
      props => (
        storage.getItem("username")!= null ? ( // <------- CHANGE!!!
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/Login',
            state: {from: props.location}
          }}/>
        )
      )
    }
  />
);

export default AuthenticatedRoute;

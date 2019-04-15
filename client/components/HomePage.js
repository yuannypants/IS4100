import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { Button } from 'primereact/button'
import 'primeicons/primeicons.css';
import {Container} from 'react-bootstrap';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    let background = require('../assets/img/background.jpg');
    return (
      <Container>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Home - IS4100 COCOMO" />
        </Helmet>
        <img src={background} style={{height: '100%', width: '100%', resizeMode: 'cover', opacity: '0.5', left: 0, top: 0, position: 'absolute', zIndex: -1}} />
        <div className="p-col-12">
          <div className="card card-w-title">
            <h1 style={{textAlign: 'center'}}>Welcome to COCOMO (Prototype)</h1>
            <div className="p-grid">
              <div className="p-offset-4" style={{'marginTop':'20px'}}> 
                <Button label="Click here to Register" icon="pi pi-user-plus" onClick={() => document.location="/Register"}/>
              </div>
              <div style={{'marginLeft':'20px', 'marginTop':'20px'}}>
                <Button label="Click here to Login" icon="pi pi-sign-in" onClick={() => document.location="/Login"}/>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

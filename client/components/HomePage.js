import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { Button } from 'primereact/button'
import 'primeicons/primeicons.css';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    let background = require('../assets/img/background.jpg');
    return (
      <div className="p-grid p-fluid">
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Home - IS4100 COCOMO" />
        </Helmet>
        <img src={background} style={{height: '100%', width: '100%', resizeMode: 'cover', opacity: '0.5', left: 0, top: 0, position: 'absolute', zIndex: -1}} />
        <div className="p-col-12">
          <div className="card card-w-title">
            <h1 style={{textAlign: 'center'}}>Welcome to IS4100</h1>
            <div className="p-grid">
              <div className="p-col-2 p-offset-4">
                <Button label="Click here to Register" icon="pi pi-user-plus" onClick={() => document.location="/Register"}/>
              </div>
              <div className="p-col-2">
                <Button label="Click here to Login" icon="pi pi-sign-in" onClick={() => document.location="/Login"}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

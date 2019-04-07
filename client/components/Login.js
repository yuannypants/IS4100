import { Button } from 'primereact/button';
import { Password } from 'primereact/password'
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { InputText } from 'primereact/inputtext';
import { httpGET, httpPOST } from '../utils/httpUtils';
import urlencode from "urlencode";

const ls = window.localStorage;

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: null
    }

    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  onClickSubmit() {
    let username = this.state.username,
      password = this.state.password;

    httpGET('http://localhost:3001/users?username=' + urlencode(username) + '&password=' + urlencode(password))
    .then(response => {
      console.log(response.data);
      if (response.data.length > 0) {
        ls.setItem('username', response.data[0].username);
        ls.setItem('nickname', response.data[0].nickname);
        ls.setItem('userType', response.data[0].userType);
        ls.setItem('userData', response.data[0]);
        if (ls.getItem('userType') === "manager")
          window.location.href = '/Projects'; // PM main page
        else
          window.location.href = '/Developer'; // Developer main page
      } else {
        this.setState({error: 'Invalid username/password.'})
      }
    })
    .catch(err => {
      console.log(err);
      this.setState({error: 'An error with the server was encountered.'})
    });
  }

  render() {
    return (
      <div className="p-grid p-fluid p-justify-center">
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Login" />
        </Helmet>
        <div className="p-col-6">
          <div className="card card-w-title">
            <h1 style={{textAlign: 'center'}}>Log In</h1>
            <div className="p-grid p-justify-center">
              <div className="p-col-10" style={{marginTop:'8px'}}>
                <span className="p-float-label">
                  <InputText id="usernameInput" value={this.state.username} onChange={e => this.setState({username: e.target.value})} />
                  <label htmlFor="usernameInput">Username</label>
                </span>
              </div>
              <div className="p-col-10" style={{marginTop:'8px'}}>
                <span className="p-float-label">
                  <Password id="passwordInput" value={this.state.password} onChange={e => this.setState({password: e.target.value})}
                            feedback={false}/>
                  <label htmlFor="passwordInput">Password</label>
                </span>
              </div>
              <div className="p-col-10">
                <small>Don't have an account? Register <a href="/Register">here</a> for free!</small>
              </div>
              {
                this.state.error && <div className="p-col-10">
                  <small style={{color:'red'}}>{this.state.error}</small>
                </div>
              }
              <div className="p-col-10">
                <Button label="Log In" icon="pi pi-sign-in" onClick={(e) => this.onClickSubmit()}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

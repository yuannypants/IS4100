import { Button } from 'primereact/button';
import { Password } from 'primereact/password'
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { InputText } from 'primereact/inputtext';
import { httpPOST } from '../utils/httpUtils'

const localStorage = window.localStorage;

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
    let data = {
      username: this.state.username,
      password: this.state.password
    }

    httpPOST('http://localhost:3000/api/public/login', data)
    .then(response => {
      localStorage.setItem('username', this.state.username);
      localStorage.setItem('nickname', response.data.nickname);
      window.location.href = '/Home'; // Redirects to main page
    })
    .catch(error => {
      let errorMsg = 'An error was encountered.';
      this.setState({error: errorMsg})
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
                <small>Donating for the first time? Register <a href="/Register">here</a>.</small>
              </div>
              {
                this.state.error && <div className="p-col-10">
                  <small style={{color:'red'}}>{this.state.error}</small>
                </div>
              }
              <div className="p-col-10">
                <Button label="Login" icon="pi pi-user-plus" onClick={this.onClickSubmit}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

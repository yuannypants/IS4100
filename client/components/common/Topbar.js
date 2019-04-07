import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container} from 'react-bootstrap';

const localStorage = window.localStorage;

export class Topbar extends Component {

  static defaultProps = {
    onToggleMenu: null
  }

  static propTypes = {
    onToggleMenu: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="layout-topbar clearfix" >
	      <Container>
        {
          localStorage.getItem("username") && (
            <button className="p-link layout-menu-button" onClick={this.props.onToggleMenu}>
              <span className="pi pi-bars"/>
            </button>
          )
        }
          <div className="layout-topbar-icons">
          {
            localStorage.getItem("username") && (
              <a href='/Settings'>
              <button className="p-link">
                <span className="layout-topbar-item-text">Settings</span>
                <span className="layout-topbar-icon pi pi-cog"/>
              </button>
              </a>
            )
          }
          {
            localStorage.getItem("username") && (
              <button className="p-link">
                <span className="layout-topbar-item-text">Resource Management</span>
                <span className="layout-topbar-icon pi pi-user"/>
              </button>
            )
          }
          {
            localStorage.getItem("username") && (
              <button className="p-link">
                <span className="layout-topbar-item-text">Notification</span>
                <span className="layout-topbar-icon pi pi-bell"/>
                {/*<span className="layout-topbar-badge">5</span>*/}
              </button>
            )
          }
          </div>
		    </Container>
      </div>
    );
  }
}

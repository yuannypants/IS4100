import React, { Component } from 'react';

export class Footer extends Component {
  render() {
    return  (
      <div className="layout-footer" style={{'textAlign': 'center', 'height':'35px', 'backgroundColor':'rgb(4,153,234)', 'paddingTop':'0', 'position':'fixed'}}>
        <span className="footer-text">
		&copy; Copyright 2019 | COCOMO | All rights reserved | IS4100 Project developed with 💖by Group 8</span>
      </div>
    );
  }
}

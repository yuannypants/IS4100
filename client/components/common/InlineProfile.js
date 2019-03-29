import React, { Component } from 'react';

const localStorage = window.localStorage;

export class InlineProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.setState({expanded: !this.state.expanded});
    event.preventDefault();
  }

  componentWillMount() {

  }

  render() {
    let profileImg = require("../../assets/img/profile.png")
    let nickname = localStorage.getItem("nickname") || 'Unknown User';

    return  (
      <div className="profile">
        <div>
          <img src={profileImg} alt="" />
        </div>
        <button className="p-link profile-link">
          <span className="username">{nickname}</span>
        </button>
      </div>
    );
  }
}

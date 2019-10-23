import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null
    };
  }

  componentDidMount() {
    const user = this.props.user;
    if (user) {
      this.setState({ userInfo: user });
    }
  }

  render() {
    let s = this.state;
    let p = this.props;
    let userInfo = s.userInfo;

    return (
      <div className="container">
        {userInfo
          ? Object.keys(userInfo).map((key, i) => {
              return (
                <div className="row" key={key + userInfo.nickname}>
                  <div className="col-3">
                    <h4>{key}: </h4>
                  </div>
                  <div className="col"> {userInfo[key]}</div>
                </div>
              );
            })
          : ""}
      </div>
    );
  }
}

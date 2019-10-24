import React, { Component } from "react";
import { Link } from "react-router-dom";
/* COMPONENTS */
import { Descriptions, Card } from "antd";
/* STYLES */
import "../../assets/styles/css/main.css";
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
      <div className="container" id="usersInfo">
        <Card title={<span className="bck-def">"Informazioni utente"</span>}>
          <Descriptions>
            {" "}
            {userInfo
              ? Object.keys(userInfo).map((key, i) => {
                  if (key === "picture") {
                    return "";
                  }
                  return (
                    <Descriptions.Item
                      label={<b>{key}</b>}
                      key={key + "i" + userInfo[key]}
                    >
                      {userInfo[key]}
                    </Descriptions.Item>
                  );
                })
              : ""}{" "}
          </Descriptions>
        </Card>
      </div>
    );
  }
}

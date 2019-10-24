import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Statistic, Icon, Card, Button } from "antd";
/* COMPONENTS */

/* MIDDLEWARES */

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: []
    };
  }

  componentDidMount() {
    let userList = this.props.userList;
    if (userList) {
      this.setSTATE("userList", userList);
      console.log(userList);
    }
  }

  render() {
    return (
      <Card title="Dashboard Utenti" bordered={true}>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic
              title="Feedback"
              value={1128}
              prefix={<Icon type="like" />}
            />
          </Col>
          <Col span={12}>
            <Statistic title="risposte positive" value={93} suffix="/ 100" />
          </Col>
          <Col span={12}>
            <Statistic title="Utenti attivi" value={112893} />
          </Col>
          <Col span={12}>
            <Statistic
              title="Bilancio del conto"
              value={112893}
              precision={2}
            />
          </Col>
        </Row>
      </Card>
    );
  }

  setSTATE(state, value) {
    this.setState({ [state]: value });
  }
}

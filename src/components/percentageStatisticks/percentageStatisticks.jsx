import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Card, Statistic, Icon, Button, Countdown } from "antd";
/* COMPONENTS */

/* MIDDLEWARES */
/* STYLES */
import "../../assets/styles/css/main.css";

export default class PercentageStatistics extends Component {
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
    const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

    return (
      <Card title="Dashboard Utenti" bordered={true}>
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Attività utenti"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<Icon type="arrow-up" />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Risposte negative"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<Icon type="arrow-down" />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Tempo trascorso"
                  value={deadline}
                  onFinish={() => {}}
                />
              </Col>
              <Col span={12}>
                <Statistic title="Tempo trascorso" value={deadline} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  }

  setSTATE(state, value) {
    this.setState({ [state]: value });
  }
}

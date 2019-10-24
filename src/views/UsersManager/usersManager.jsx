import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Loading from "../../components/loading/Loading.jsx";
import { useAuth0 } from "../../react-auth0-spa.jsx";
/* MIDDLEWARES */
import { getUsers } from "../../utils/axios.middleware/users.api.jsx";

export default class UsersManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UsersList: [],
      columns: []
    };
  }

  getAllUsers() {
    let self = this;
    getUsers()
      .then(res => {
        console.log(res);
        self.setSTATE("UsersList", res);
      })
      .catch(function(error) {
        console.log(error);
        if (process.env.enviroment === "DEV_START") {
          /* WHEN DEV MODE IS NEEDED */
        }
      });
  }

  render() {
    return (
      <Container className="mb-5">
        <Row className="align-items-center profile-header mb-5 text-center text-md-left">
          <Col md={2}>COLSSSSSS</Col>
        </Row>
      </Container>
    );
  }

  setSTATE(state, value) {
    this.setState({ [state]: value });
  }
}

import React from "react";
import { Container, Row, Col, Jumbotron } from "reactstrap";
import UserInfo from "../../components/userInfo/UserInfo.jsx";
import Loading from "../../components/loading/Loading.jsx";
import { useAuth0 } from "../../react-auth0-spa.jsx";
/* COMPONENTS */
import PercentageStatisticks from "../../components/percentageStatisticks/percentageStatisticks.jsx";
import Feedback from "../../components/feedback/feedback.jsx";
/* STYLES */
import "../../assets/styles/css/main.css";
import "antd/dist/antd.css";

const UserManager = () => {
  const { loading, user } = useAuth0();
  if (loading || !user) {
    return <Loading />;
  }

  return (
    <Container className="mb-5">
      <Row className="mb-5">
        <Col>
          <Jumbotron style={{ background: "#06C" }} className={"color-w"}>
            <h1 className="display-3">Bentornato, {user.nickname}!</h1>
            <p className="lead">
              Dai un'occhiata agli ultimi aggiornamenti che potresti esserti
              perso!
            </p>
            <hr className="my-2 bck-w" />
          </Jumbotron>
        </Col>
      </Row>{" "}
      <Row className="mb-5">
        <UserInfo user={user} />
      </Row>
      <Row className="mb-5">
        <Col>
          <Feedback />
        </Col>
      </Row>
      <PercentageStatisticks />
    </Container>
  );
};

export default UserManager;

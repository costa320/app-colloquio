import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
/* AUTH */
import PrivateRoute from "./components/PrivateRoute.jsx";
/* COMPONENTS */
import NavBar from "./components/navbar/NavBar.jsx";
import Footer from "./components/footer/Footer.jsx";
import Loading from "./components/loading/Loading.jsx";

/* VIEWS */
import Home from "./views/HomePage/Home.jsx";
import Profile from "./views/ProfilePage/Profile.jsx";
import UsersManager from "./views/UsersManager/usersManager.jsx";
import { useAuth0 } from "./react-auth0-spa.jsx";
import history from "./utils/history.js";

// styles
import "./assets/styles/css/app.css";
// fontawesome
import initFontAwesome from "./utils/initFontAwesome.js";
initFontAwesome();

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/usersManager" component={UsersManager} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

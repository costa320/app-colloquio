import React, { Fragment } from "react";
/* COMPONENTS */
import UsersTable from "../../components/UsersTable/usersTable.jsx";
import Hero from "../../components/hero/Hero.jsx";

const Home = () => (
  <Fragment>
    <Hero />
    <hr />
    <div className="container">
      <div className="row">
        <div className="col">
          <UsersTable />
        </div>
      </div>
    </div>
  </Fragment>
);

export default Home;

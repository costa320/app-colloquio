import React from "react";

import logo from "../../assets/img/logo.svg";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">Siamo Tutti Connessi</h1>

    <p className="lead">
      Applicazione demo per <a href="https://almaviva.it">Almaviva</a>
    </p>
  </div>
);

export default Hero;

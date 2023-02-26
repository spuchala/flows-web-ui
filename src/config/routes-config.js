import React from "react";
import { Routes, Route } from "react-router-dom";

import Flows from "../views/flows/flows";
import About from "../views/about/about";
import Home from "../views/home/home";
import Surveys from "../views/surveys/surveys";
import Login from "../views/login/login";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/flows" element={<Flows />} />
      <Route exact path="/surveys" element={<Surveys />} />
      <Route exact path="/flows-web-ui" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
    </Routes>
  );
};

export default RoutesConfig;

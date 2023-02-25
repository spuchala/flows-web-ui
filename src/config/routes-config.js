import React from "react";
import { Routes, Route } from "react-router-dom";

import Flows from "../views/flows/flows";
import About from "../views/about/about";
import Home from "../views/home/home";
import Surveys from "../views/surveys/surveys";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/flows" element={<Flows />} />
      <Route exact path="/surveys" element={<Surveys />} />
      <Route exact path="/flows-web-ui" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/home" element={<Home />} />
    </Routes>
  );
};

export default RoutesConfig;

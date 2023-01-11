import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../views/home/home";
import About from "../views/about/about";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route exact path="/" element={<About />} /> 
      {/* This is the main landing page  */}
      <Route exact path="/flows" element={<Home />} />
      <Route exact path="/flows-web-ui" element={<About />} />
      {/* <Route exact path="/departments" element={<About />} /> */}
      {/* <Route exact path="/people" element={<Home />} /> */}
      <Route exact path="/about" element={<About />} />
    </Routes>
  );
};

export default RoutesConfig;

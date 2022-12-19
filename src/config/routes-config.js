import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../views/home/home";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/flows" element={<Home />} />
      <Route exact path="/departments" element={<Home />} />
      <Route exact path="/people" element={<Home />} />
    </Routes>
  );
};

export default RoutesConfig;

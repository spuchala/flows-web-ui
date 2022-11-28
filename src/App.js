import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";

import theme from "./config/theme-config";
import RoutesConfig from "./config/routes-config";
import NavBar from "./components/nav-bar/nav-bar";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <div className="app-root">
          <div className="app-container">
            <RoutesConfig />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;

import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";

import theme from "./config/theme-config";
import RoutesConfig from "./config/routes-config";
import NavBar from "./components/nav-bar/nav-bar";
import "./App.css";
import UserContext from "./app-context";

const App = () => {
  const [userContext, setUserContext] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <UserContext.Provider value={[userContext, setUserContext]}>
          <NavBar />
          <div className="app-root">
            <div className="app-container">
              <RoutesConfig />
            </div>
          </div>
        </UserContext.Provider>
      </Router>
    </ThemeProvider>
  );
};

export default App;

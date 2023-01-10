import React from "react";

import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import "./about.css";

const About = () => {
  return (
    <div className="aboutContainer">
      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: "text.primary" }}>
          About Us
        </Typography>
        <Typography variant="h4" gutterBottom>
          About Us title goes here
        </Typography>
        <Typography variant="body2" gutterBottom>
          Stranded. Yes, she was now the first person ever to land on Venus, but
          that was of little consequence. Her name would be read by millions in
          school as the first to land here, but that celebrity would never
          actually be seen by her. She looked at the control panel and knew
          there was nothing that would ever get it back into working order. She
          was the first and it was not clear this would also be her last.
        </Typography>
      </Box>
      <br />
      <Button
        component={Link}
        to="/flows"
        variant="contained"
        color="secondary"
      >
        Get Started
      </Button>
    </div>
  );
};
export default About;

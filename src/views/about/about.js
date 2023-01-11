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
{/*         <Typography variant="h4" gutterBottom>
          About Us title goes here
        </Typography> */}
        <Typography variant="body2" align = "left" gutterBottom>
        <li>Move from simple process based diagrams to a more detailed nuanced understanding of your system</li>
        <li>See sequencing of actions, flows between departments and identify how each of which departments/people are critical points to the process</li>
        <li>Use the diagram to repurpose the flow, identify where to insert new technologies.Identify Data flows and transfer to ERP</li>
        
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

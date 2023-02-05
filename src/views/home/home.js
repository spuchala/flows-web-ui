import React from "react";

import { Container, Typography, Grid, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import "./home.css";

const Home = () => {
  return (
    <>
      <section className="mainSection">
        <Container maxWidth="lg" className="mainContainer">
          <img
            style={{ display: "none" }}
            src="https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&amp;fit=crop&amp;w=1400"
            alt="increase priority"
          />
          <Typography variant="h4" gutterBottom>
            DISCOVER, UNDERSTAND AND IMPROVE 
          </Typography>
          <Typography variant="h4" gutterBottom>
            Your Process ( Culture)
          </Typography>
        </Container>
      </section>
      <section className="featuresSection">
        <Container className="featuresContainer">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={4} md={4}>
                <AccountTreeIcon />
                <Typography>
                Discover your process using our innovative low resistance survey methodologies by building from scratch. 
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <LightbulbIcon/>
                <Typography>
                 Visualize how your staff interacts with your process. Overlay process, departments, technologies  and people to see the pinch points 
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <AcUnitIcon />
                <Typography>
                  Use our tools to improve your process, see your how new technologies,  adding new process will change your organization and its effects  
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </section>
      <section className="howItWorksSection">
        <Container className="howItWorksContainer">
          <Typography variant="h4" gutterBottom>
            HOW IT WORKS
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={4} md={4}>
                <AcUnitIcon />
                <Typography>
                  Feature One description goes here. Change the icon above this
                  by googling MUI Icons and replace the icon above.
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <AcUnitIcon />
                <Typography>
                  Feature Two description goes here. Change the icon above this
                  by googling MUI Icons and replace the icon above.
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <AcUnitIcon />
                <Typography>
                  Feature Three description goes here. Change the icon above
                  this by googling MUI Icons and replace the icon above.
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <div className="getStartedContainer">
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/flows"
            >
              GET STARTED
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;

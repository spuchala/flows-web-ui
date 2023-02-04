import React from "react";

import { Container, Typography, Grid, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AcUnitIcon from "@mui/icons-material/AcUnit";
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
          <Typography variant="h3" gutterBottom>
            MAIN HEADING GOES HERE
          </Typography>
          <Typography variant="h5" gutterBottom>
            Sub Heading Goes Here
          </Typography>
        </Container>
      </section>
      <section className="featuresSection">
        <Container className="featuresContainer">
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

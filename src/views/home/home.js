import React from "react";

import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Divider,
  Link as LinkButton
} from "@mui/material";
import { Link } from "react-router-dom";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import Groups2Icon from '@mui/icons-material/Groups2';
import ArticleIcon from '@mui/icons-material/Article';
import MemoryIcon from '@mui/icons-material/Memory';
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
        <Typography variant="h5" gutterBottom>
            FEATURES
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={10}>
              <Grid item xs={4} md={4}>
                <AccountTreeIcon fontSize = "large"/>
                <Typography variant="h6">Discover</Typography>
                <Typography>
                Discover your process using our innovative low resistance survey methodologies by building from scratch. 
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <LightbulbIcon fontSize = "large"/>
                <Typography variant="h6">Visualize</Typography>
                <Typography>
                 Visualize how your staff interacts with your process. Overlay process, departments, technologies  and people to see the pinch points 
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <MemoryIcon fontSize = "large"/>
                <Typography variant="h6">Optimize</Typography>
                <Typography>
                  Use our tools to improve your process, see your how new technologies,  adding new process will change your organization and its effects  
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <IntegrationInstructionsIcon fontSize = "large"/>
                <Typography variant="h6">Integrate</Typography>
                <Typography>
                Our product can integrate with other tools and systems to provide a seamless workflow awareness. The data can be used by developers to build enterprise systems               
                 </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <Groups2Icon fontSize = "large"/>
                <Typography variant="h6">Collaborate</Typography>
                <Typography>
                Allow multiple stakeholders to collaborate and contribute to the process discovery and optimization process  
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <ArticleIcon fontSize = "large"/>
                <Typography variant="h6">Documentation</Typography>
                <Typography>
                We provide a platform for documenting and storing process information, making it easier for employees,clients and consultants to access and follow processes. You can see on timeline the whole change.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </section>
      <section className="howItWorksSection">
        <Container className="howItWorksContainer">
          <Typography variant="h5" gutterBottom>
            HOW IT WORKS
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={4} md={4}>
                <AcUnitIcon fontSize = "large"/>
                <Typography variant="h6">Survey</Typography>
                <Typography>
                Create a quick survey, add additional conditions like loops, existing process, departments if needed 
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <AcUnitIcon fontSize = "large"/>
                <Typography variant="h6">Analyze</Typography>
                <Typography>
                 Gather all the information in one place, see conflicting and missing connections. Adjust the connections or identify 
                 the changes as needed. Add additional information or send it back for confirmation 
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <AcUnitIcon fontSize = "large"/>
                <Typography variant="h6">Collaborate</Typography>
                <Typography>
                 Collaborate with others in the organization. Identify bottle necks, pinch points, current wait times, loads on users and departments.
                 
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
      <footer className="footerSection">
        <Container className="footerContainer">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={4} md={4}>
                <Typography variant="h8" gutterBottom>
                  FLOWS
                </Typography>
                <div className="footerDividerContainer">
                  <Divider />
                </div>
                <LinkButton className="footerLink" component={Link} to="/flows">
                  Create One
                </LinkButton>
              </Grid>
              <Grid item xs={4} md={4}>
                <Typography variant="h8" gutterBottom>
                  ABOUT
                </Typography>
                <div className="footerDividerContainer">
                  <Divider />
                </div>
                <LinkButton className="footerLink" component={Link} to="/about">
                  About Us
                </LinkButton>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </footer>
    </>
  );
};

export default Home;
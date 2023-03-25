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
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import Groups2Icon from "@mui/icons-material/Groups2";
import ArticleIcon from "@mui/icons-material/Article";
import MemoryIcon from "@mui/icons-material/Memory";
import PollIcon from "@mui/icons-material/Poll";
import SchemaIcon from "@mui/icons-material/Schema";
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
          <Typography variant="h5" gutterBottom>
          Discover, visualize, and optimize 
                    </Typography>
          <Typography variant="h6" gutterBottom>
          your company processes and Improve them
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
                <AccountTreeIcon fontSize="large" />
                <Typography variant="h6">Discover</Typography>
                <Typography>
                Take the guesswork out of your company's workflow by building a complete picture from the ground up with our easy-to-use survey tools
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <LightbulbIcon fontSize="large" />
                <Typography variant="h6">Visualize</Typography>
                <Typography>
                Get a bird's eye view of your company's processes by overlaying departments, technologies, and people to identify bottlenecks and streamline workflow.
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <MemoryIcon fontSize="large" />
                <Typography variant="h6">Optimize</Typography>
                <Typography>
                Fine-tune your company's workflow by exploring the effects of adding new processes or technologies, and uncover opportunities for growth and optimization.
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <IntegrationInstructionsIcon fontSize="large" />
                <Typography variant="h6">Integrate</Typography>
                <Typography>
                Seamlessly integrate with other tools and systems to gain full visibility into your company's workflow and optimize for efficiency
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <Groups2Icon fontSize="large" />
                <Typography variant="h6">Collaborate</Typography>
                <Typography>
                Break down silos and facilitate teamwork by allowing stakeholders from different departments and functions to collaborate on the process discovery and optimization process
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <ArticleIcon fontSize="large" />
                <Typography variant="h6">Documentation</Typography>
                <Typography>
                Keep all your company's process information organized and accessible with our comprehensive platform that simplifies access for employees, clients, and consultants.
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
                <PollIcon fontSize="large" />
                <Typography variant="h6">Survey</Typography>
                <Typography>
                Quickly and easily create custom surveys tailored to your company's unique needs, including the ability to add loops, existing processes, and departments as needed.                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <SchemaIcon fontSize="large" />
                <Typography variant="h6">Analyze</Typography>
                <Typography>
                Cut through the complexity of process analysis by consolidating all relevant data in one place, and quickly identifying discrepancies or gaps. Use our tools to adjust or add connections as needed, and seamlessly confirm changes with stakeholders.
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <Groups2Icon fontSize="large" />
                <Typography variant="h6">Collaborate</Typography>
                <Typography>
                Empower your team to work together to identify process inefficiencies by collaborating across departments and functions. Gain insight into current wait times, user loads, and departmental workflows to optimize processes.
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

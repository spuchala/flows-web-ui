import React, { useState } from "react";

import { Button, Typography, Grid } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import Title from "../../components/title/title";
import "./surveys.css";
import SurveyForm from "../../components/survey-form/survey-form";

const Surveys = () => {
  const [openSurveyForm, setOpenSurveyForm] = useState(false);

  const handleCreateSurvey = () => {
    setOpenSurveyForm(true);
  };

  return (
    <div>
      <Title
        title={"Surveys"}
        subTitle={
          "Create surveys, send them to people in your departments and generate flows from the survyes."
        }
      />
      <Grid item xs={4} md={4} className="noSurveysContainer">
        <WarningAmberIcon fontSize="large" />
        <Typography variant="h6">No surveys exist. Generate One.</Typography>
        <br />
        <Button
          variant="contained"
          color="secondary"
          component="label"
          onClick={handleCreateSurvey}
        >
          Create A Survey
        </Button>
      </Grid>
      <SurveyForm
        open={openSurveyForm}
        onCloseSurvey={() => setOpenSurveyForm(false)}
        onCreateSurvey={() => setOpenSurveyForm(false)}
      />
    </div>
  );
};

export default Surveys;

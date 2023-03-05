import React, { useState } from "react";

import { Button, Typography, Grid } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import Title from "../../components/title/title";
import "./surveys.css";
import SurveyForm from "../../components/survey-form/survey-form";
import OrgDepartmentsPeopleStepper from "../../components/org-departments-people-stepper/org-departments-people-stepper";
import { getOrgDepartmentPeopleDataToStorage } from "../../utils/session-storage-utils";
import PeopleTable from "../../components/people-table/people-table";

const Surveys = () => {
  const [openSurveyForm, setOpenSurveyForm] = useState(false);
  const [openOrgDepartmentsPeopleStepper, setOpenOrgDepartmentsPeopleStepper] =
    useState(false);
  const [orgDepartmentsPeopleData, setOrgDepartmentsPeopleData] = useState(
    getOrgDepartmentPeopleDataToStorage()
  );

  const handleCreateSurvey = () => {
    setOpenSurveyForm(true);
  };

  const handleOpenCreateOrgDepartmentsStepper = () => {
    setOpenOrgDepartmentsPeopleStepper(true);
  };

  const handleCloseCreateOrgDepartmentsStepper = () => {
    setOpenOrgDepartmentsPeopleStepper(false);
    if (getOrgDepartmentPeopleDataToStorage()) {
      setOrgDepartmentsPeopleData(getOrgDepartmentPeopleDataToStorage());
    }
  };

  return (
    <>
      <div>
        <Title
          title={"Surveys"}
          subTitle={
            "Create surveys, send them to people in your departments and generate flows from the survyes."
          }
        />
        {orgDepartmentsPeopleData ? (
          <div className="surveysContainer">
            <PeopleTable
              people={orgDepartmentsPeopleData.people}
              onCreateSurvey={handleCreateSurvey}
            />
          </div>
        ) : (
          <Grid item xs={4} md={4} className="noSurveysContainer">
            <WarningAmberIcon fontSize="large" />
            <Typography variant="h6">
              No surveys exist. Generate One.
            </Typography>
            <br />
            <Button
              variant="contained"
              color="secondary"
              component="label"
              onClick={handleOpenCreateOrgDepartmentsStepper}
            >
              Create Org,Departments&People
            </Button>
          </Grid>
        )}
      </div>
      {openSurveyForm && (
        <SurveyForm
          open={openSurveyForm}
          onCloseSurvey={() => setOpenSurveyForm(false)}
          onCreateSurvey={() => setOpenSurveyForm(false)}
        />
      )}
      {openOrgDepartmentsPeopleStepper && (
        <OrgDepartmentsPeopleStepper
          openOrgDepartmentsPeopleStepper={openOrgDepartmentsPeopleStepper}
          onCloseOrgDepartmentsPeopleStepper={
            handleCloseCreateOrgDepartmentsStepper
          }
        />
      )}
    </>
  );
};

export default Surveys;

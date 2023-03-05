import React, { useState } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Stepper,
  Step,
  StepLabel
} from "@mui/material";

import AddOrganization from "../org-departments-people-stepper/add-organization/add-organization";
import AddDepartments from "./add-departments/add-departments";

const OrgDepartmentsPeopleStepper = ({
  openOrgDepartmentsPeopleStepper = false,
  onCloseOrgDepartmentsPeopleStepper
}) => {
  const orgDepartmentsPeopleSteps = ["Organaization", "Departments", "People"];
  const [activeStep, setActiveStep] = useState(0);
  const [errorstate, setErrorState] = useState(false);
  const [orgDeptsPeopleData, setOrgDeptsPeopleData] = useState({
    organization: "",
    departments: [],
    people: []
  });

  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextStep = (event) => {
    if (event.target.innerText === "submit") {
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleOrganizationChange = (org) => {
    setOrgDeptsPeopleData({ ...orgDeptsPeopleData, organization: org });
  };

  const handleDepartmentsChange = (departments) => {
    setOrgDeptsPeopleData({ ...orgDeptsPeopleData, departments: departments });
  };

  const handleError = (error) => {
    setErrorState(error);
  };

  const getStepContent = (activeStep) => {
    switch (activeStep) {
      case 0:
        return (
          <AddOrganization
            onOrganizationChange={(org) => handleOrganizationChange(org)}
            onError={(error) => handleError(error)}
          ></AddOrganization>
        );
      case 1:
        return (
          <AddDepartments
            onDepartmentsChange={(departments) =>
              handleDepartmentsChange(departments)
            }
            onError={(error) => handleError(error)}
          ></AddDepartments>
        );
      default:
        return "Unknown stepIndex";
    }
  };

  const isInErrorState = () => {
    const { organization, departments, people } = orgDeptsPeopleData;
    if (activeStep === 0) {
      return organization === "" || errorstate;
    } else if (activeStep === 1) {
      return departments.length === 0 || errorstate;
    } else if (activeStep === 2) {
      return people.length === 0 || errorstate;
    }
    return false;
  };

  return (
    <div>
      <Dialog
        open={openOrgDepartmentsPeopleStepper}
        onClose={onCloseOrgDepartmentsPeopleStepper}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Org Departments People</DialogTitle>
        <DialogContent className="orgDepartmentsPeopleDialogContent">
          <Stepper activeStep={activeStep} alternativeLabel>
            {orgDepartmentsPeopleSteps.map((orgDepartmentsPeopleStep) => (
              <Step key={orgDepartmentsPeopleStep}>
                <StepLabel>{orgDepartmentsPeopleStep}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {getStepContent(activeStep)}
        </DialogContent>
        <DialogActions>
          <div className="leftContainer">
            <Button
              variant="outlined"
              onClick={onCloseOrgDepartmentsPeopleStepper}
            >
              cancel
            </Button>
          </div>
          <div className="rightContainer">
            <Button
              disabled={activeStep === 0}
              onClick={handleBackStep}
              variant="outlined"
            >
              back
            </Button>
            <Button
              variant="outloned"
              color="primary"
              disabled={isInErrorState()}
              onClick={handleNextStep}
            >
              {activeStep === orgDepartmentsPeopleSteps.length - 1
                ? "submit"
                : "next"}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrgDepartmentsPeopleStepper;

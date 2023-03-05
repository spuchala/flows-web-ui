import React from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  DialogContent
} from "@mui/material";
import { Stack } from "@mui/system";

import DropDown from "../drop-down/drop-down";
import { getOrgDepartmentPeopleDataToStorage } from "../../utils/session-storage-utils";

const SurveyForm = ({ open, onCloseSurvey, onCreateSurvey, surveyFor }) => {
  const handleCloseSurvey = () => {
    onCloseSurvey();
  };

  const handleCreateSurvey = () => {
    onCreateSurvey(surveyFor);
  };

  const handlePeopleChange = () => {};

  const { people } = getOrgDepartmentPeopleDataToStorage();

  const peopleForSurvey = people
    .filter(({ person }) => person !== surveyFor)
    .map(({ person }) => ({ label: person, value: person }));

  return (
    <Dialog open={open} onClose={handleCloseSurvey} fullWidth maxWidth="xs">
      <DialogTitle>Create Survey</DialogTitle>
      <DialogContent className="dialogContent">
        <br />
        <Stack spacing={2}>
          <DropDown
            title="Who do you receive the flow from?"
            items={peopleForSurvey}
            selectedItem={peopleForSurvey[0].value}
            onChange={handlePeopleChange}
            size="small"
          />
          <DropDown
            title="Who does the flow go to?"
            items={peopleForSurvey}
            selectedItem={peopleForSurvey[0].value}
            onChange={handlePeopleChange}
            size="small"
          />
          <TextField label="Comments" variant="outlined" multiline />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseSurvey}>close</Button>
        <Button onClick={handleCreateSurvey}>create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SurveyForm;

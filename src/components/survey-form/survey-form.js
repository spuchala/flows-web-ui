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

import mockPeopleConfig from "../../config/mock-people-config";
import DropDown from "../drop-down/drop-down";

const SurveyForm = ({ open, onCloseSurvey, onCreateSurvey }) => {
  const handleCloseSurvey = () => {
    onCloseSurvey();
  };

  const handleCreateSurvey = () => {
    onCreateSurvey();
  };

  const handlePeopleChange = () => {};

  return (
    <Dialog open={open} onClose={handleCloseSurvey} fullWidth maxWidth="xs">
      <DialogTitle>Create Survey</DialogTitle>
      <DialogContent className="dialogContent">
        <br />
        <Stack spacing={2}>
          <TextField
            label="Who do you receive the flow from?"
            variant="outlined"
          />
          <TextField label="Who does the flow go to?" variant="outlined" />
          <TextField label="Comments" variant="outlined" multiline />
          <DropDown
            title="Send the flow to"
            items={mockPeopleConfig}
            selectedItem={mockPeopleConfig[0].value}
            onChange={handlePeopleChange}
            size="small"
          />
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

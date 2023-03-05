import React, { useState } from "react";

import { TextField } from "@mui/material";

import "./add-organization.css";

const AddOrganization = ({ onOrganizationChange, onError }) => {
  const [organization, setOrganization] = useState("");
  const [error, setError] = useState(null);

  const handleOrganizationChange = (event) => {
    const changedOrganization = event.target.value;
    setOrganization(changedOrganization);

    if (/^([A-Za-z ]){1,}$/.test(changedOrganization)) {
      setError(null);
      onError(false);
    } else {
      setError("Invalid organization");
      onError(true);
    }
    onOrganizationChange(changedOrganization);
  };

  return (
    <div className="addOrganizationContainer">
      <TextField
        label="Organization"
        error={Boolean(error)}
        helperText={error !== null && error !== "" ? error : ""}
        value={organization}
        required={true}
        variant="outlined"
        className="orgTextWidth"
        onChange={(e) => handleOrganizationChange(e)}
        inputProps={{ maxLength: 100 }}
      />
    </div>
  );
};

export default AddOrganization;

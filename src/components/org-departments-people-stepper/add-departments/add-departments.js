import React, { useState } from "react";

import { TextField, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import "./add-departments.css";

const AddDepartments = ({ onDepartmentsChange, onError }) => {
  const [departments, setDepartments] = useState([
    { department: "", error: "" }
  ]);

  const handleAddDepartment = () => {
    setDepartments([...departments, { department: "", error: "" }]);
  };

  const handleRemoveDepartment = (id) => {
    setDepartments(departments.filter((_, index) => index !== id));
  };

  const handleDepartmentChange = (id, event) => {
    const changedDepartment = event.target.value;
    let cloneDepartmentsState = [...departments];

    if (/^([A-Za-z ]){1,}$/.test(changedDepartment)) {
      cloneDepartmentsState[id].error = "";
      onError(false);
    } else {
      cloneDepartmentsState[id].error = "Invalid Department";
      onError(true);
    }
    cloneDepartmentsState[id].department = changedDepartment;
    setDepartments(cloneDepartmentsState);
    onDepartmentsChange(cloneDepartmentsState);
  };

  return (
    <>
      {departments.map(({ department, error }, index) => {
        return (
          <Stack
            spacing={2}
            direction="row"
            className="addDepartmentsContainer"
            key={index}
          >
            <TextField
              label="Department"
              error={Boolean(error)}
              helperText={error !== null && error !== "" ? error : ""}
              value={department}
              required={true}
              variant="outlined"
              className="textFieldWidth"
              onChange={(e) => handleDepartmentChange(index, e)}
              inputProps={{ maxLength: 100 }}
            />
            {index === 0 ? (
              <IconButton
                color="primary"
                aria-label="add new"
                component="label"
                size="large"
                disabled={departments.length === 5}
                onClick={handleAddDepartment}
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                aria-label="remove"
                component="label"
                size="large"
                onClick={() => handleRemoveDepartment(index)}
              >
                <DeleteIcon fontSize="inherit" color="error" />
              </IconButton>
            )}
          </Stack>
        );
      })}
    </>
  );
};

export default AddDepartments;

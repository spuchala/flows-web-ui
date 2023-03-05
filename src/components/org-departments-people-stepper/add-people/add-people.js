import React, { useState } from "react";

import { TextField, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import "./add-people.css";
import DropDown from "../../drop-down/drop-down";
import { isEmpty } from "../../../utils";

const AddPeople = ({ departments, onPeopleChange, onError }) => {
  const [people, setPeople] = useState([
    { person: "", department: departments[0].department, error: "" }
  ]);

  const handleAddPerson = () => {
    setPeople([
      ...people,
      { person: "", department: departments[0].department, error: "" }
    ]);
  };

  const handleRemovePerson = (id) => {
    setPeople(people.filter((_, index) => index !== id));
  };

  const handlePersonChange = (id, event) => {
    const changedPerson = event.target.value;
    let clonePeopleState = [...people];

    if (/^([A-Za-z ]){1,}$/.test(changedPerson)) {
      clonePeopleState[id].error = "";
      onError(false);
    } else {
      clonePeopleState[id].error = "Invalid Person";
      onError(true);
    }
    clonePeopleState[id].person = changedPerson;
    setPeople(clonePeopleState);
    onPeopleChange(clonePeopleState);
  };

  const handlePersonDepartmentChange = (id, changedDepartment) => {
    let clonePeopleState = [...people];
    clonePeopleState[id].department = changedDepartment;
    setPeople(clonePeopleState);
    onPeopleChange(clonePeopleState);
  };

  const getDepartments = () => {
    return departments.map(({ department }) => ({
      label: department,
      value: department
    }));
  };

  return (
    <>
      {people.map(({ person, department, error }, index) => {
        return (
          <Stack
            spacing={2}
            direction="row"
            className="addPeopleContainer"
            key={index}
          >
            <TextField
              label="Person"
              error={Boolean(error)}
              helperText={error !== null && error !== "" ? error : ""}
              value={person}
              required={true}
              variant="outlined"
              className="personTextWidth"
              onChange={(e) => handlePersonChange(index, e)}
              inputProps={{ maxLength: 100 }}
            />
            {!isEmpty(departments) && (
              <DropDown
                title="Department"
                minWidth={160}
                items={getDepartments()}
                onChange={(e) => handlePersonDepartmentChange(index, e)}
                selectedItem={department}
                width={300}
              />
            )}
            {index === 0 ? (
              <IconButton
                color="primary"
                aria-label="add new"
                component="label"
                size="large"
                disabled={departments.length === 5}
                onClick={handleAddPerson}
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                aria-label="remove"
                component="label"
                size="large"
                onClick={() => handleRemovePerson(index)}
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

export default AddPeople;

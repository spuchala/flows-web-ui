import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  IconButton,
  TextField
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";

import DropDown from "../drop-down/drop-down";
import { isEmpty } from "../../utils";

export default function CustomTable({ config, data }) {
  const [editRowIndex, setEditRowIndex] = useState(-1);

  const handleEditRow = (index) => {
    debugger;
    setEditRowIndex(index);
  };

  const handleDeleteRow = () => {};

  const getDistinctValuesForAColumn = (column) => {
    let distinctValues = [];
    const distinctSet = new Set();
    data.forEach((row) => {
      if (!isEmpty(row[column])) {
        distinctSet.add(row[column]);
      }
    });

    distinctSet.forEach((key) =>
      distinctValues.push({ label: key, value: key })
    );
    return distinctValues;
  };

  const getEditableControl = (editableControl, key, value) => {
    if (editableControl === "textBox") {
      return <TextField label={key} value={value} variant="standard" />;
    } else if (editableControl === "dropdown") {
      return (
        <DropDown
          title={key}
          minWidth={60}
          items={getDistinctValuesForAColumn(key)}
          selectedItem={value}
          width={100}
        />
      );
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="edit people table">
        <TableHead>
          <TableRow>
            {config.map(({ key, label }) => {
              return <TableCell key={key}>{label}</TableCell>;
            })}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(
            (row, index) =>
              !row.isParent && (
                <TableRow key={index}>
                  {config.map(({ key, editableControl }) => {
                    return (
                      <TableCell key={key}>
                        {editRowIndex !== index
                          ? row[key]
                          : getEditableControl(editableControl, key, row[key])}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        component="label"
                        size="small"
                        onClick={() => handleEditRow(index)}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        aria-label="delete"
                        component="label"
                        size="small"
                        onClick={handleDeleteRow}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                      {editRowIndex === index && (
                        <IconButton
                          color="primary"
                          aria-label="clear"
                          component="label"
                          size="small"
                          onClick={() => setEditRowIndex(-1)}
                        >
                          <ClearIcon fontSize="inherit" />
                        </IconButton>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

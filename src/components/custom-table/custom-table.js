import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/EditCalendar";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";

export default function CustomTable({ config, data }) {
  debugger;
  const handleEditRow = () => {};

  const handleDeleteRow = () => {};

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
                  {config.map(({ key }) => {
                    return <TableCell key={key}>{row[key]}</TableCell>;
                  })}
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        component="label"
                        size="small"
                        onClick={handleEditRow}
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

import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function PeopleTable({ people, onCreateSurvey }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Survey</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map(({ person, department }, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                person
              </TableCell>
              <TableCell>{person}</TableCell>
              <TableCell>{person}</TableCell>
              <TableCell>{department}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  component="label"
                  onClick={onCreateSurvey}
                >
                  Create Survey
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

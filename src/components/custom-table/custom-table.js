import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function CustomTable({ config, data }) {
  debugger;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="edit people table">
        <TableHead>
          <TableRow>
            {config.map(({ key, label }) => {
              return <TableCell key={key}>{label}</TableCell>;
            })}
            <TableCell></TableCell>
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
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

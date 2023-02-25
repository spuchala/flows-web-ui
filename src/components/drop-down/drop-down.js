import React, { useState } from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

export default function DropDown({ title, items, selectedItem, onChange }) {
  const [selectedItemState, setSelectedItemState] = useState(selectedItem);

  const handleChange = (event) => {
    const changedValue = event.target.value;
    setSelectedItemState(event.target.value);
    onChange(changedValue);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedItemState}
          label={title}
          onChange={handleChange}
        >
          {items.map(({ label, value }) => {
            return <MenuItem value={value}>{label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

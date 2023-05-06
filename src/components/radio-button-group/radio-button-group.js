import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const RadioButtonGroup = ({ label, config, selectedValue, onChange }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        row
        value={selectedValue}
        onChange={(event) => onChange(event.target.value)}
      >
        {config.map(({ key, label, disabled }) => {
          return (
            !disabled && (
              <FormControlLabel
                key={key}
                value={key}
                control={<Radio />}
                label={label}
              />
            )
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonGroup;

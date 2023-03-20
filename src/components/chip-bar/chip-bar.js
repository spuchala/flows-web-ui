import React, { useState } from "react";

import { Stack, Chip } from "@mui/material";

const ChipBar = ({ config, callback }) => {
  const [selectedOption, setSelectedOption] = useState(config[0].key);

  const handleOptionChange = (key) => {
    setSelectedOption(key);
    callback(key);
  };

  const getPrimaryChip = (key, info) => {
    return (
      <Chip
        onClick={() => handleOptionChange(key)}
        key={key}
        label={info}
        color={selectedOption === key ? "primary" : "secondary"}
        size="medium"
      />
    );
  };

  const getChip = (key, info) => {
    return (
      <Chip
        onClick={() => handleOptionChange(key)}
        key={key}
        label={info}
        size="medium"
      />
    );
  };

  return (
    <Stack direction="row" spacing={2}>
      {config.map(({ key, info }) => {
        return selectedOption === key
          ? getPrimaryChip(key, info)
          : getChip(key, info);
      })}
    </Stack>
  );
};

export default ChipBar;

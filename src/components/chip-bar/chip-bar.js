import React, { useState } from "react";

import { Stack, Chip } from "@mui/material";

const ChipBar = ({ config, callback }) => {
  const [selectedOption, setSelectedOption] = useState(config[0].key);

  const handleOptionChange = (key) => {
    setSelectedOption(key);
    callback(key);
  };

  return (
    <Stack direction="row" spacing={2}>
      {config.map(({ key, info }) => {
        return (
          <Chip
            onClick={() => handleOptionChange(key)}
            key={key}
            label={info}
            color={selectedOption === key ? "primary" : "secondary"}
            size="medium"
          />
        );
      })}
    </Stack>
  );
};

export default ChipBar;

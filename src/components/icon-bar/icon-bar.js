import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

const IconBar = ({ config }) => {
  const [selectedOption, setSelectedOption] = useState(config[0].key);

  const handleOptionChange = (key) => {
    debugger;
    setSelectedOption(key);
  };

  return (
    <Stack direction="row" spacing={0}>
      {config.map(({ key, icon, info }) => {
        return (
          <IconButton
            onClick={() => handleOptionChange(key)}
            key={key}
            color={selectedOption === key ? "primary" : "secondary"}
          >
            {icon}
          </IconButton>
        );
      })}
    </Stack>
  );
};

export default IconBar;

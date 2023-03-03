import React from "react";

import { Box, Typography } from "@mui/material";

import "./title.css";

const Title = ({ title, subTitle }) => {
  return (
    <Box className="titleContainer">
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        className="subTitleContainer"
      >
        {subTitle}
      </Typography>
    </Box>
  );
};

export default Title;

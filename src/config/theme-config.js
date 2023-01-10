import { createTheme } from "@mui/material/styles";

const themeColors = {
  primary: "#9c27b0",
  secondary: "#00e5ff"
};

const theme = createTheme({
  palette: {
    primary: {
      main: themeColors.primary
    },
    secondary: {
      main: themeColors.secondary
    },
    text: {
      primary: themeColors.primary,
      secondary: themeColors.secondary
    }
  }
});

export default theme;

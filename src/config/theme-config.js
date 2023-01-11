import { createTheme } from "@mui/material/styles";

const themeColors = {
  primary: "#7986cb",
  secondary: "#ef6c00"
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

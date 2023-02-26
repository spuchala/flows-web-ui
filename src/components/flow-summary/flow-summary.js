import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  DialogActions,
  Avatar,
  Divider,
  Typography
} from "@mui/material";
import { blue } from "@mui/material/colors";

const FlowSummary = ({ summary, open, onCloseSummary }) => {
  const handleClose = () => {
    onCloseSummary();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Typography variant="h6">Summary</Typography>
      </DialogTitle>
      <Divider />
      <List sx={{ pt: 0 }}>
        {summary.map(({ label, value }, index) => (
          <ListItem key={index} disableGutters>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  {value}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <DialogActions>
        <Button onClick={handleClose}>close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FlowSummary;

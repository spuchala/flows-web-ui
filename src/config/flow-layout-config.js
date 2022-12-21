import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";

const flowLayoutTypes = {
  FLOW: "flowView",
  TABLE_VIEW: "tableView",
  SEQUENCE_FLOW: "sequenceFlow"
};

const flowLayOutsConfig = [
  {
    key: flowLayoutTypes.FLOW,
    icon: <AccountTreeIcon />,
    info: "View Flow View"
  },
  {
    key: flowLayoutTypes.SEQUENCE_FLOW,
    icon: <ViewColumnIcon />,
    info: "View Sequence Flow View"
  }
];

export { flowLayOutsConfig, flowLayoutTypes };

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";

const flowLayoutTypes = {
  GRAPH_LEFT_TO_RIGHT: "LR",
  GRAPH_TOP_TO_BOTTOM: "TB",
  SEQUENCE_FLOW: "SEQUENCE"
};

const flowLayOutsConfig = [
  {
    key: flowLayoutTypes.GRAPH_LEFT_TO_RIGHT,
    icon: <AccountTreeIcon />,
    info: "Graph-Left-TO-Right"
  },
  {
    key: flowLayoutTypes.GRAPH_TOP_TO_BOTTOM,
    icon: <AccountTreeIcon />,
    info: "Graph-Top-TO-Bottom"
  },
  {
    key: flowLayoutTypes.SEQUENCE_FLOW,
    icon: <ViewColumnIcon />,
    info: "Sequence"
  }
];

export { flowLayOutsConfig, flowLayoutTypes };

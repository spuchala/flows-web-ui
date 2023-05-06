const graphLibraryTypes = {
  REACT_FLOWS: "reactFlows",
  MERMAID: "mermaid",
  CYTOSCAPE: "cytoscape"
};

const graphLibraryConfig = [
  {
    key: graphLibraryTypes.REACT_FLOWS,
    label: "React Flows",
    isDefault: false
  },
  {
    key: graphLibraryTypes.MERMAID,
    label: "Mermaid",
    isDefault: true
  },
  {
    key: graphLibraryTypes.CYTOSCAPE,
    label: "Cytoscape",
    isDefault: false,
    disabled: true
  }
];

export { graphLibraryTypes, graphLibraryConfig };

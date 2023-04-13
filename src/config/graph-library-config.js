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
    isDefault: false
  },
  {
    key: graphLibraryTypes.CYTOSCAPE,
    label: "Cytoscape",
    isDefault: true
  }
];

export { graphLibraryTypes, graphLibraryConfig };

const graphLibraryTypes = {
  REACT_FLOWS: "reactFlows",
  MERMAID: "mermaid",
  CYTOSCAPE: "cytoscape",
  D3: "d3"
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
  },
  {
    key: graphLibraryTypes.D3,
    label: "D3",
    isDefault: false
  }
];

export { graphLibraryTypes, graphLibraryConfig };

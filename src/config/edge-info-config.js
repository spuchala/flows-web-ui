const edgeInfoTypes = {
  EDGES_BY_DESCRIPTION: "edges-by-description",
  EDGES_BY_DURATION: "edges-by-duration"
};

const edgeInfoConfig = [
  {
    label: " Description",
    value: edgeInfoTypes.EDGES_BY_DESCRIPTION
  },
  {
    label: "Duration",
    value: edgeInfoTypes.EDGES_BY_DURATION
  }
];

export { edgeInfoConfig, edgeInfoTypes };

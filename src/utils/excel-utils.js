import * as XLSX from "xlsx";
import { MarkerType } from "reactflow";

const basePosition = { x: 0, y: 0 };
const edgeType = "smoothstep";

const getNodesAndEdgesFromExcel = (fileReadData) => {
  const edges = getRelationshipsFromExcel(fileReadData);
  const nodes = [];
  const nodesSet = new Set();

  edges.forEach((edge) => {
    nodesSet.add(edge.source);
    nodesSet.add(edge.target);
  });
  debugger;
  nodesSet.forEach((nodeItem) => {
    nodes.push({
      id: nodeItem,
      data: { label: nodeItem },
      position: basePosition
    });
  });
  return { nodes, edges };
};

const getNodesFromExcel = (fileReadData) => {
  const nodesWorkSheet = fileReadData.Sheets["Nodes"];
  const parsedNodesData = XLSX.utils.sheet_to_json(nodesWorkSheet, {
    header: 1
  });
  const synthesizedNodesData = synthesizeSheetFeed(parsedNodesData);
  const nodesForFlows = getNodesForReactFlows(synthesizedNodesData);
  return nodesForFlows;
};

const getRelationshipsFromExcel = (fileReadData) => {
  const nodesWorkSheet = fileReadData.Sheets["Relationships"];
  const parsedRelationshipsData = XLSX.utils.sheet_to_json(nodesWorkSheet, {
    header: 1
  });
  const synthesizedRelationshipsData = synthesizeSheetFeed(
    parsedRelationshipsData
  );
  const relationshipsForFlows = getRelationshipsForReactFlows(
    synthesizedRelationshipsData
  );
  return relationshipsForFlows;
};

const getRelationshipsForReactFlows = (input) => {
  let relationships = [];
  input.forEach(({ fromParty, toParty }, index) => {
    relationships.push({
      id: index.toString(),
      source: fromParty,
      target: toParty,
      type: edgeType,
      markerEnd: {
        type: MarkerType.ArrowClosed
      }
    });
  });
  return relationships;
};

const getNodesForReactFlows = (input) => {
  let nodes = [];
  input.forEach(({ name }) => {
    nodes.push({
      id: name,
      data: { label: name },
      position: basePosition
    });
  });
  return nodes;
};

const synthesizeSheetFeed = (input) => {
  let synthesizedList = [];
  const columns = input[0];
  //remove columns
  input = input.slice(1);
  input.forEach((element) => {
    let entry = {};
    columns.forEach((column, columnIndex) => {
      entry[toCamelCase(column.toString())] = element[columnIndex]
        .toString()
        .trim();
    });
    synthesizedList.push(entry);
  });
  return synthesizedList;
};

const toCamelCase = (text) => {
  const formatted = text
    .toLowerCase()
    .replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
  return formatted.substring(0, 1).toLowerCase() + formatted.substring(1);
};

export {
  getNodesFromExcel,
  getRelationshipsFromExcel,
  getNodesAndEdgesFromExcel
};

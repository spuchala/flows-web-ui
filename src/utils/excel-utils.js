import * as XLSX from "xlsx";
import { MarkerType } from "reactflow";

import { toCamelCase, replaceSpaceWithUnderscore } from "./text-utils";

const basePosition = { x: 0, y: 0 };
const edgeType = "smoothstep";

const getNodesEdgesAndGroupsFromExcel = (fileReadData) => {
  const edges = getRelationshipsFromExcel(fileReadData);
  const { nodes, groups } = getNodesAndGroupsFromExcel(fileReadData);

  return { nodes, groups, edges };
};

const getNodesAndGroupsFromExcel = (fileReadData) => {
  const nodesWorkSheet = fileReadData.Sheets["Nodes"];
  const parsedNodesData = XLSX.utils.sheet_to_json(nodesWorkSheet, {
    header: 1
  });
  const synthesizedNodesData = synthesizeSheetFeed(parsedNodesData);
  const { nodes, groups } =
    getNodesAndGroupsForReactFlows(synthesizedNodesData);
  return { nodes, groups };
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
  input.forEach(
    ({ fromParty, toParty, duration, description, technology }, index) => {
      relationships.push({
        id: index.toString(),
        source: fromParty,
        target: toParty,
        type: edgeType,
        markerEnd: {
          type: MarkerType.ArrowClosed
        },
        duration,
        description,
        technology
      });
    }
  );
  return relationships;
};

const getNodesAndGroupsForReactFlows = (input) => {
  let nodes = [];
  let groups = new Map();

  input.forEach(({ name, department }) => {
    const nodeName = replaceSpaceWithUnderscore(name);
    nodes.push({
      id: nodeName,
      parentNode: department,
      data: { label: nodeName },
      position: basePosition
    });

    if (department) {
      if (groups.has(department)) {
        groups.get(department).push(nodeName);
      } else {
        groups.set(department, [nodeName]);
      }
    }
  });

  return { nodes, groups };
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
        ? element[columnIndex].toString().trim()
        : "";
    });
    synthesizedList.push(entry);
  });
  return synthesizedList;
};

export { getNodesEdgesAndGroupsFromExcel };

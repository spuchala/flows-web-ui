import * as XLSX from "xlsx";
import { MarkerType } from "reactflow";

import { toCamelCase, replaceSpaceWithUnderscore } from "./text-utils";
import { isEmpty } from "../utils";

const basePosition = { x: 0, y: 0 };
const edgeType = "straight";

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
        source: replaceSpaceWithUnderscore(fromParty),
        target: replaceSpaceWithUnderscore(toParty),
        type: edgeType,
        markerEnd: {
          type: MarkerType.Arrow
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
      parentNode: isEmpty(department) ? null : department,
      data: { label: name },
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
  nodes = [...nodes, ...getParentNodesForReactFlowsGroups(nodes)];
  return { nodes, groups };
};

// for each node fetch the parent node since React Flows considers the parentNodes to be in the nodes as well
const getParentNodesForReactFlowsGroups = (nodes) => {
  let parentNodes = [];
  nodes.forEach(({ parentNode }) => {
    if (
      !nodes.find(({ id }) => id === parentNode) &&
      !parentNodes.find(({ id }) => id === parentNode) &&
      !isEmpty(parentNode)
    ) {
      parentNodes.push({
        id: parentNode,
        data: { label: parentNode },
        position: basePosition,
        className: "light",
        isParent: true,
        type: "group",
        style: {
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          width: 200,
          height: 200
        }
      });
    }
  });
  return parentNodes;
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

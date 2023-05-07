import dagre from "dagre";
import dagreD3 from "dagre-d3";

import { replaceSpaceWithUnderscore } from "./text-utils";
import { edgeInfoTypes } from "../config/edge-info-config";

const nodeWidth = 150;
const nodeHeight = 25;

const getLayoutedElements = (flowData, direction = "TB") => {
  const { nodes, edges } = flowData;
  getLayoutByDagreGraph(nodes, edges, direction);
  const dagreGraph = getLayoutByDagreD3Graph(nodes, edges, direction);

  const nodesWithCordinates = getXYCoordinatesForANode(dagreGraph, nodes);
  return { layoutedNodes: nodesWithCordinates, layoutedEdges: edges };
};

const getXYCoordinatesForANode = (dagreGraph, nodes) => {
  const parentChildrenMap = {};
  nodes.forEach((node) => {
    if (!node.isParent && node.parentNode) {
      if (parentChildrenMap[node.parentNode]) {
        let childrenOfAParent = parentChildrenMap[node.parentNode];
        childrenOfAParent.push(node);
        parentChildrenMap[node.parentNode] = childrenOfAParent;
      } else {
        parentChildrenMap[node.parentNode] = [node];
      }
    } else {
      const nodeDimensions = dagreGraph.node(node.id);
      node.position = {
        x: nodeDimensions.x,
        y: nodeDimensions.y
      };
      node.style = {
        height: nodeDimensions.height,
        width: nodeDimensions.width
      };
    }
  });

  Object.keys(parentChildrenMap).forEach((parentNodeId) => {
    const parentNodeDimensions = dagreGraph.node(parentNodeId);

    parentChildrenMap[parentNodeId].forEach((childNode, index) => {
      const childNodeDimensions = dagreGraph.node(childNode.id);

      // check if child is going out of parent box
      if (
        childNodeDimensions.x + childNodeDimensions.width >
        parentNodeDimensions.width
      ) {
        const calculatedNewX = 20;
        const calculatedNewY = 20 + index * 80;
        childNode.position = {
          x: calculatedNewX,
          y: calculatedNewY
        };
        childNode.style = {
          height: childNodeDimensions.height,
          width: childNodeDimensions.width
        };
      } else {
        childNode.position = {
          x: childNodeDimensions.x,
          y: childNodeDimensions.y
        };
        childNode.style = {
          height: childNodeDimensions.height,
          width: childNodeDimensions.width
        };
      }
    });
  });
  return nodes;
};

const getLayoutByDagreGraph = (nodes, edges, direction) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: direction });
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
  dagre.layout(dagreGraph);
  return dagreGraph;
};

const getLayoutByDagreD3Graph = (nodes, edges, direction) => {
  const dagreD3Graph = new dagreD3.graphlib.Graph({ compound: true }).setGraph({
    rankdir: direction
  });
  nodes.forEach((node) => {
    dagreD3Graph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  nodes.forEach((node) => {
    dagreD3Graph.setParent(node.id, node.parentNode);
  });

  edges.forEach((edge) => {
    dagreD3Graph.setEdge(edge.source, edge.target);
  });

  try {
    dagre.layout(dagreD3Graph);
  } catch (error) {
    return dagreD3Graph;
  }
  return dagreD3Graph;
};

const getMermaidGraphFromFlowData = (flowData, edgeType, direction = "TB") => {
  const { edges, groups } = flowData;
  let graphContent = `graph ${direction};`;
  edges.forEach(({ source, target, duration, description }) => {
    graphContent =
      graphContent +
      `${replaceSpaceWithUnderscore(source)}-->|${
        edgeType === edgeInfoTypes.EDGES_BY_DESCRIPTION ? description : duration
      }|${replaceSpaceWithUnderscore(target)};`;
  });
  groups.forEach((groupValues, groupName) => {
    graphContent = graphContent + `subgraph ${groupName};`;
    groupValues.forEach((nodeId) => {
      const nodeInGroup = flowData.nodes.find((n) => n.id === nodeId);
      graphContent =
        graphContent + `${replaceSpaceWithUnderscore(nodeInGroup.name)};`;
    });
    graphContent = graphContent + "end;";
  });
  graphContent =
    graphContent + "linkStyle 0 stroke-width:4px,fill:none,stroke:red;";
  return graphContent;
};

const getMermaidSequenceDiagramFromFlowData = (flowData, edgeType) => {
  const { edges } = flowData;
  let graphContent = "sequenceDiagram;autonumber;";
  edges.forEach(({ source, target, description, duration }) => {
    graphContent =
      graphContent +
      `${replaceSpaceWithUnderscore(source)}->>${replaceSpaceWithUnderscore(
        target
      )}: ${
        edgeType === edgeInfoTypes.EDGES_BY_DESCRIPTION ? description : duration
      };`;
  });
  return graphContent;
};

const getFlowsSummary = (flowData) => {
  const { nodes } = flowData;
  const summary = [{ label: "No Of People Involved", value: nodes.length }];
  return summary;
};

export {
  getLayoutedElements,
  getMermaidGraphFromFlowData,
  getMermaidSequenceDiagramFromFlowData,
  getFlowsSummary
};

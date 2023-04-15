import React, { useState, useRef, useEffect } from "react";

import Cytoscape from "cytoscape";
import COSEBilkent from "cytoscape-cose-bilkent";
import CytoscapeComponent from "react-cytoscapejs";

Cytoscape.use(COSEBilkent);

const CytoscapeFlows = ({ nodes, edges }) => {
  const cyRef = useRef();

  const elements = [
    { data: { id: "Assigned", label: "Assigned" }, selectable: true },
    { data: { id: "Created", label: "Created" }, selectable: true },
    { data: { id: "Started", label: "Started" }, selectable: true },
    { data: { id: "On Hold", label: "On Hold" }, selectable: true },
    { data: { id: "Completed", label: "Completed" }, selectable: true },
    { data: { id: "Approved", label: "Approved" }, selectable: true },
    // edges
    {
      data: {
        id: "a1",
        source: "Created",
        target: "Assigned",
        label: "assign"
      }
    },
    {
      data: { id: "a2", source: "Assigned", target: "Started", label: "start" }
    },
    {
      data: { id: "a3", source: "On Hold", target: "Started", label: "start" }
    },
    { data: { id: "a4", source: "Started", target: "On Hold", label: "hold" } },
    {
      data: {
        id: "a5",
        source: "Started",
        target: "Completed",
        label: "complete"
      }
    },
    {
      data: {
        id: "a6",
        source: "Completed",
        target: "Approved",
        label: "approve"
      }
    }
  ];

  // This effect runs once on mount and handles setting up imperative
  // event listeners on the Cytoscape core ref
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) {
      return;
    }
    cy.on("select", "edge", (event) => {
      const transitionName = event.target[0].data().label;
      // eslint-disable-next-line no-console
      console.log(`> transition '${transitionName}' selected`);
    });
  }, []);

  const layout = {
    name: "cose-bilkent",
    // other options
    padding: 50,
    nodeDimensionsIncludeLabels: true,
    // These options all help keep the nodes farther from each other
    // so that edge labels (the transition names) have more space to
    // render. The 'idealEdgeLength' seems like the best choice for
    // the workflows tested.
    idealEdgeLength: 75
    // edgeElasticity: 0.1,
    // nodeRepulsion: 10000,
  };

  const cytoscapeStylesheet = [
    {
      selector: "node",
      style: {
        "background-color": "#1976d2",
        width: "label",
        height: "label",
        // a single "padding" is not supported in the types :(
        "padding-top": "4",
        "padding-bottom": "4",
        "padding-left": "4",
        "padding-right": "4",
        // this fixes the text being shifted down on nodes (sadly no fix for edges, but it's not as obvious there without borders)
        "text-margin-y": -3,
        shape: "round-rectangle"
      }
    },
    {
      selector: "node[label]",
      style: {
        label: "data(label)",
        "font-size": "12",
        color: "white",
        "text-halign": "center",
        "text-valign": "center"
      }
    },
    {
      selector: "edge",
      style: {
        "curve-style": "bezier",
        "target-arrow-shape": "triangle",
        width: 1.5
      }
    },
    {
      selector: "edge[label]",
      style: {
        label: "data(label)",
        "font-size": "12",
        "text-background-color": "white",
        "text-background-opacity": 1,
        "text-background-padding": "2px",
        "text-margin-y": -4,
        // so the transition is selected when its label/name is selected
        "text-events": "yes"
      }
    }
  ];

  return (
    <CytoscapeComponent
      boxSelectionEnabled={false}
      cy={(cy) => {
        cyRef.current = cy;
      }}
      elements={elements}
      layout={layout}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%"
      }}
      stylesheet={cytoscapeStylesheet}
    />
  );
};

export default CytoscapeFlows;

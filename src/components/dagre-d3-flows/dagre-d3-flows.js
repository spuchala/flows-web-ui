import React, { useEffect, useRef } from "react";
import dagreD3 from "dagre-d3";
import * as d3 from "d3";

import "./dagre-d3-flows.css";

const DagreD3Flows = ({ nodes, edges, groups, mermaidContent }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const g = new dagreD3.graphlib.Graph({ compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(function () {
        return {};
      });
    //set nodes
    nodes.forEach(({ name }) => {
      g.setNode(name, { label: name });
    });

    //set groups
    let i = 1;
    groups.forEach((groupValues, groupName) => {
      g.setNode(groupName, {
        label: groupName,
        clusterLabelPos: "bottom",
        style: `fill: ${i % 2 === 0 ? "#ffd47f" : "#d3d7e8"}`
      });
      groupValues.forEach((nodeIdInGroup) => {
        const nodeInGroup = nodes.find((node) => node.id === nodeIdInGroup);
        g.setParent(nodeInGroup.name, groupName);
      });
      i++;
    });

    //set edges
    edges.forEach(({ sourceName, targetName }) => {
      g.setEdge(sourceName, targetName);
    });

    const render = new dagreD3.render();
    var svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    var svgGroup = svg.append("g");

    // Run the renderer. This is what draws the final graph.
    render(d3.select("svg g"), g);

    // Center the graph
    var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
    svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
    svg.attr("height", g.graph().height + 40);
  }, [mermaidContent]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ width: "100%", height: "80vh", border: "1px solid #16001E" }}>
      <svg ref={svgRef} width="800" height="600"></svg>
    </div>
  );
};

export default DagreD3Flows;

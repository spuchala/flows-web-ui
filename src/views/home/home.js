import React, { useState } from "react";

import Button from "@mui/material/Button";
import * as XLSX from "xlsx";
import "reactflow/dist/style.css";

import IconBar from "../../components/icon-bar/icon-bar";
import { flowLayOutsConfig } from "../../config/flow-layout-config";
import {
  getNodesFromExcel,
  getRelationshipsFromExcel
} from "../../utils/excel-utils";
import { getLayoutedElements } from "../../utils/flows-utils";
import Flows from "../../components/flows/flows";
import "./home.css";

const Home = () => {
  const [nodes, setNodes] = useState(null);
  const [edges, setEdges] = useState(null);

  const handleFileUpload = (e) => {
    console.log("hello");
    e.preventDefault();

    const files = e.target.files,
      file = files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      const fileData = e.target.result;
      const fileReadData = XLSX.read(fileData, { type: "binary" });
      const initialNodes = getNodesFromExcel(fileReadData);
      const initialEdges = getRelationshipsFromExcel(fileReadData);
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(initialNodes, initialEdges);

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    };
    reader.readAsBinaryString(file);
  };

  const handleLayoutChange = (layoutType) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
      layoutType
    );
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  };

  return (
    <div className="container">
      <Button variant="contained" color="secondary" component="label">
        Upload Excel
        <input type="file" onChange={handleFileUpload} hidden />
      </Button>
      {nodes && edges && (
        <div className="flowsContainer">
          <IconBar
            config={flowLayOutsConfig}
            callback={(layoutType) => handleLayoutChange(layoutType)}
          />
          <Flows nodes={nodes} edges={edges} />
        </div>
      )}
    </div>
  );
};

export default Home;

import React, { useState } from "react";

import Button from "@mui/material/Button";

import * as XLSX from "xlsx";

import Flows from "../../components/flows/flows";
import IconBar from "../../components/icon-bar/icon-bar";
import { flowLayOutsConfig } from "../../config/flow-layout-config";
import {
  getNodesFromExcel,
  getRelationshipsFromExcel
} from "../../utils/excel-utils";
import "./home.css";

const Home = () => {
  const [nodes, setNodes] = useState(null);
  const [relationships, setRelationships] = useState(null);

  const handleFileUpload = (e) => {
    e.preventDefault();

    const files = e.target.files,
      file = files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      const fileData = e.target.result;
      const fileReadData = XLSX.read(fileData, { type: "binary" });
      setNodes(getNodesFromExcel(fileReadData));
      setRelationships(getRelationshipsFromExcel(fileReadData));
    };
    reader.readAsBinaryString(file);
  };

  const handleLayoutChange = (layoutType) => {
    debugger;
  };

  return (
    <div className="container">
      <Button variant="contained" color="secondary" component="label">
        Upload Excel
        <input type="file" onChange={handleFileUpload} hidden />
      </Button>
      {nodes && relationships && (
        <div className="flowsContainer">
          <IconBar
            config={flowLayOutsConfig}
            callback={(layoutType) => handleLayoutChange(layoutType)}
          />
          <Flows nodes={nodes} edges={relationships}></Flows>
        </div>
      )}
    </div>
  );
};

export default Home;

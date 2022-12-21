import React, { useState } from "react";

import Button from "@mui/material/Button";

import * as XLSX from "xlsx";

import Flows from "../../components/flows/flows";
import IconBar from "../../components/icon-bar/icon-bar";
import { flowLayOutsConfig } from "../../config/flow-layout-config";
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
      processAndSetNodes(fileReadData);
      processAndSetRelationships(fileReadData);
    };
    reader.readAsBinaryString(file);
  };

  const processAndSetNodes = (fileReadData) => {
    const nodesWorkSheet = fileReadData.Sheets["Nodes"];
    const parsedNodesData = XLSX.utils.sheet_to_json(nodesWorkSheet, {
      header: 1
    });
    const synthesizedNodesData = synthesizeSheetFeed(parsedNodesData);
    const nodesForFlows = getNodesForFlows(synthesizedNodesData);
    setNodes(nodesForFlows);
  };

  const processAndSetRelationships = (fileReadData) => {
    const nodesWorkSheet = fileReadData.Sheets["Relationships"];
    const parsedRelationshipsData = XLSX.utils.sheet_to_json(nodesWorkSheet, {
      header: 1
    });
    const synthesizedRelationshipsData = synthesizeSheetFeed(
      parsedRelationshipsData
    );
    const relationshipsForFlows = getRelationshipsForFlows(
      synthesizedRelationshipsData
    );
    setRelationships(relationshipsForFlows);
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

  const getNodesForFlows = (input) => {
    let nodes = [];
    let baseX = 650;
    let baseY = 0;

    input.forEach(({ name }) => {
      baseX = baseX + 0;
      baseY = baseY + 100;

      nodes.push({
        id: name,
        data: { label: name },
        position: { x: baseX + 50, y: baseY + 100 }
      });
    });
    return nodes;
  };

  const getRelationshipsForFlows = (input) => {
    let relationships = [];
    input.forEach(({ fromParty, toParty }, index) => {
      relationships.push({
        id: index.toString(),
        source: fromParty,
        target: toParty
      });
    });
    return relationships;
  };

  const toCamelCase = (text) => {
    const formatted = text
      .toLowerCase()
      .replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
    return formatted.substring(0, 1).toLowerCase() + formatted.substring(1);
  };

  return (
    <div className="container">
      <Button variant="contained" color="secondary" component="label">
        Upload Excel
        <input type="file" onChange={handleFileUpload} hidden />
      </Button>
      {nodes && relationships && (
        <div className="flowsContainer">
          <IconBar config={flowLayOutsConfig} />
          <Flows nodes={nodes} edges={relationships}></Flows>
        </div>
      )}
    </div>
  );
};

export default Home;

import * as XLSX from "xlsx";

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
      target: toParty
    });
  });
  return relationships;
};

const getNodesForReactFlows = (input) => {
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

export { getNodesFromExcel, getRelationshipsFromExcel };

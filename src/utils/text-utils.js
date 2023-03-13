const toCamelCase = (text) => {
  const formatted = text
    .toLowerCase()
    .replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
  return formatted.substring(0, 1).toLowerCase() + formatted.substring(1);
};

const replaceSpaceWithUnderscore = (text) => {
  return text.replace(" ", "_");
};

const replaceUnderscoreWithSpace = (text) => {
  return text.replace("_", " ");
};

export { toCamelCase, replaceSpaceWithUnderscore, replaceUnderscoreWithSpace };

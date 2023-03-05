export const isEmpty = (val) => {
  switch (typeof val) {
    case "undefined":
      return true;
    case "number":
      return val === 0;
    case "string":
      return val.length === 0;
    case "boolean":
      return !val;
    case "object":
      if (val === null) return true;
      else if (Array.isArray(val)) return val.length === 0;
      else return Object.keys(val).length === 0;
    default:
      return false;
  }
};

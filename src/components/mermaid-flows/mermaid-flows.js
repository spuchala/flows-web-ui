import React, { useEffect } from "react";

import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true
});

const MermaidFlows = ({ content, flowLayoutChanged }) => {
  console.log(content);
  useEffect(() => {
    if (flowLayoutChanged) {
      const mermaidElement = document.getElementById("mermaid-chart");
      if (mermaidElement.hasAttribute("data-processed")) {
        mermaidElement.removeAttribute("data-processed");
      }
    }
    mermaid.contentLoaded();
  }, [content, flowLayoutChanged]);

  return (
    <div id="mermaid-chart" className="mermaid">
      {content}
    </div>
  );
};

export default MermaidFlows;

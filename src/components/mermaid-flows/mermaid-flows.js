import React, { useEffect } from "react";

import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true
});

const MermaidFlows = ({ content, reRenderFlows }) => {
  useEffect(() => {
    if (reRenderFlows) {
      const mermaidElement = document.getElementById("mermaid-chart");
      if (mermaidElement.hasAttribute("data-processed")) {
        mermaidElement.removeAttribute("data-processed");
      }
    }
    mermaid.contentLoaded();
  }, [content, reRenderFlows]);

  return (
    <div id="mermaid-chart" className="mermaid">
      {content}
    </div>
  );
};

export default MermaidFlows;

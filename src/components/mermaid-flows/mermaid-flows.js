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
  }, [content]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div
        id="mermaid-chart"
        className="mermaid"
        style={{ width: "100%", height: "100%", border: "1px solid #16001E" }}
      >
        {content}
      </div>
    </div>
  );
};

export default MermaidFlows;

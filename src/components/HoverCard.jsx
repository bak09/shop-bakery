import React from "react";

const HoverCard = () => {
  return (
    <div className="lab-card">
      <div className="lab-title">Baker Tip</div>

      <div className="hover-card">
        Hover for today's recommendation
      </div>
    </div>
  );
};

export default React.memo(HoverCard);

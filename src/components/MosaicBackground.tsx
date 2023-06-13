import React from "react";

const MosaicBackground = () => {
  const squareCount = 100; // Number of squares to display
  const activeSquares = Array.from(
    { length: squareCount },
    () => Math.random() < 0.5
  ); // Generate an array of booleans randomly

  return (
    <div className="mosaicBackground">
      {activeSquares.map((isActive, index) => (
        <div
          key={index}
          className={`${"square"} ${isActive ? "active" : ""}`}
        ></div>
      ))}
    </div>
  );
};

export default MosaicBackground;

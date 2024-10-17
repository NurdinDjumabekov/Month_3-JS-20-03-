import React from "react";

const MapIcon = ({
  backgroundColor = "transparent",
  color = "#222",
  width = "20",
  height = "20",
  ...props
}) => {
  return (
    <div style={{ display: "inline-flex", cursor: "pointer" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={backgroundColor}
        class="bi bi-geo-alt-fill"
        viewBox="0 0 16 16"
        stroke={color}
      >
        <path
          stroke={color}
          d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
        />
      </svg>
    </div>
  );
};

export default MapIcon;

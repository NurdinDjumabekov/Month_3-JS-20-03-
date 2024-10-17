import React from "react";

const EyesIcon = ({
  backgroundColor = "transparent",
  color = "#222",
  width = "20",
  height = "20",
  ...props
}) => {
  return (
    <div style={{ display: "inline-flex", cursor: "pointer" }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill={backgroundColor}
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
      >
        <path
          opacity="0.5"
          d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
          stroke={color}
          stroke-width="1.5"
        ></path>
        <path
          d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
          stroke={color}
          stroke-width="1.5"
        ></path>
      </svg>
    </div>
  );
};

export default EyesIcon;

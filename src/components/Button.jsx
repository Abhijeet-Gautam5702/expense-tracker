import React from "react";

function Button({
  buttonText,
  className = "",
  width = "",
  type = "button",
  fill,
}) {
  return (
    <button
      className={`rounded-small font-medium ${width} ${className} transition-all hover:scale-110 duration-150 `}
    >
      {buttonText}
    </button>
  );
}

export default Button;

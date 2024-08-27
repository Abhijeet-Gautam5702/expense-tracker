import React from "react";

function Button({
  buttonText,
  className = "",
  width = "w-full",
  type = "button",
}) {
  return (
    <button
      type={type}
      className={`rounded-small font-medium ${width} ${className} bg-accent text-background font-regular text-sm-1 px-5 py-4`}
    >
      {buttonText}
    </button>
  );
}

export default Button;

import React from "react";

function Button({
  buttonText,
  className = "",
  width = "w-full",
  type = "button",
  ...props
}) {
  return (
    <button
    
      type={type}
      className={`rounded-small font-medium ${width} ${className} bg-accent text-background font-regular lg:text-sm-1 px-5 lg:py-4 py-3`}
      {...props}
    >
      {buttonText}
    </button>
  );
}

export default Button;

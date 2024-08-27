import React, { useState } from "react";

function Input({ id, type = "text", label, placeholder }, ref) {
  // local state
  const [input, setInput] = useState(type === "number" ? 0 : "");

  return (
    <div className="w-full">
      <label htmlFor="" className="text-primary font-regular text-sm-1">
        {label}
      </label>
      <input
        className=" w-full border-[1.5px] border-primary rounded-small px-5 py-3 outline-none"
        id={id}
        type={type}
        value={input}
        ref={ref}
        placeholder={placeholder}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}

export default Input;

import React, { forwardRef, useId } from "react";

function Select({ label, options = [], ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full space-y-1">
      <label htmlFor={id} className="text-primary font-regular text-sm-1">
        {label}
      </label>
      <select
        name="category"
        id={id}
        ref={ref}
        className="w-full border-[1.5px] border-primary rounded-small px-5 py-3 outline-none"
        {...props}
      >
        <option value="">Select a category</option>
        {options.map((item) => (
          <option key={item.categoryId} value={item.category}>
            {item.category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);

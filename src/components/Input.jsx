import React, { forwardRef, useId } from "react";

// SELF-NOTE
/*
  (I) This is an isolated Input component which will be used in various other places (with react-hook-form). 

  - We want to give control of this isolated input component to its parent component(s), i.e., we want to expose this DOM node to its parent component(s) so that they can access its state.

  - So we wrap this functional component within React.forwardRef() to forward its access to its parent. Hence, no need to define internal local in this input component.
  
  (II) React-hook-form injects its own {...register("keyName",{options})} props to control the change in the input-values. 

  - So we simply take all the props into this input component as {...props} so that react-hook-form can work.
*/

function Input({ type = "text", label, placeholder, ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full space-y-1">
      <label htmlFor={id} className="text-primary font-regular text-sm-1">
        {label}
      </label>
      <input
        className=" w-full border-[1.5px] border-primary rounded-small px-5 py-3 outline-none"
        id={id}
        ref={ref}
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input);

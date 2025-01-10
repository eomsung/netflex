import clsx from "clsx";
import React from "react";

//size sm md lg
//intent: primary secondary white black
function Button({
  children,
  size = "md",
  intent = "primary",
  className,
  disabled,
  ...props
}) {
  const defualtClassNames = clsx(
    "hover:brightness-90 active:brightness-75 transition"
  );

  const sizeClassNames = clsx({
    "px-3 py-1.5 text-[13px] font-medium rounded gap-y-4": size === "sm",
    "px-4 py-2 text-[15px] font-semibold rounded-md": size === "md",
    "px-5 py-2.5 text-[17px] font-bold rouned-lg": size === "lg",
  });

  const intentClassNames = clsx({
    "bg-red-500": intent == "primary",
    "bg-gray-300": intent == "secondary",
    "bg-white text-black": intent == "white",
    "bg-blakc": intent == "black",
  });

  // const disabledClassnames =clsx({
  //   "brightness-50 cursor-not-allowed hover:brightness-50 active:brightness-50"
  // })

  return (
    <button
      className={clsx(
        sizeClassNames,
        intentClassNames,
        defualtClassNames,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

import React from "react";

export const Button = ({ onClick, children, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-blue-500 text-white p-2 rounded ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

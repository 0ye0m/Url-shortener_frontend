import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div className={`border rounded shadow p-4 ${className}`}>{children}</div>
  );
};

export const CardHeader = ({ children }) => (
  <div className="mb-2">{children}</div>
);
export const CardContent = ({ children }) => <div>{children}</div>;
export const CardTitle = ({ children }) => (
  <h2 className="text-lg font-bold">{children}</h2>
);
export const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-600">{children}</p>
);

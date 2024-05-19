import * as React from "react";
import { cn } from "@/lib/utils";

const SelectContext = React.createContext<{ value: string, onValueChange: (value: string) => void } | undefined>(undefined);

const Select: React.FC<{ onValueChange: (value: string) => void, value: string, children: React.ReactNode }> = ({ onValueChange, value, children }) => {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("SelectTrigger must be used within a Select");

  return (
    <button className="px-4 py-2 border rounded-md" onClick={() => console.log("trigger click")}>
      {children}
    </button>
  );
};

const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("SelectContent must be used within a Select");

  return (
    <div className="absolute mt-1 w-full rounded-md shadow-lg bg-white dark:bg-gray-700">
      {children}
    </div>
  );
};

const SelectItem: React.FC<{ value: string, children: React.ReactNode }> = ({ value, children }) => {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("SelectItem must be used within a Select");

  return (
    <div className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 ${context.value === value ? "bg-gray-200 dark:bg-gray-500" : ""}`} onClick={() => context.onValueChange(value)}>
      {children}
    </div>
  );
};

const SelectValue: React.FC<{ placeholder: string }> = ({ placeholder }) => {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("SelectValue must be used within a Select");

  return (
    <span>
      {context.value || placeholder}
    </span>
  );
};

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };

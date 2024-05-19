import * as React from "react";

const Tabs = ({ children, defaultValue, className }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, handleTabClick })
      )}
    </div>
  );
};

const TabsList = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const TabsTrigger = ({ value, children, activeTab, handleTabClick }) => (
  <button
    onClick={() => handleTabClick(value)}
    className={`tab-trigger ${activeTab === value ? "active" : ""}`}
  >
    {children}
  </button>
);

const TabsContent = ({ value, children, activeTab }) =>
  activeTab === value ? <div>{children}</div> : null;

export { Tabs, TabsList, TabsTrigger, TabsContent };

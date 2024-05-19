import React, { createContext, useContext, useState } from "react";

const PairContext = createContext(null);

export const PairProvider = ({ initialPair, children }) => {
  const [currentPair, setCurrentPair] = useState(initialPair.split("-"));

  return (
    <PairContext.Provider value={{ currentPair, setCurrentPair }}>
      {children}
    </PairContext.Provider>
  );
};

export const usePair = () => {
  const context = useContext(PairContext);
  if (!context) {
    throw new Error("usePair must be used within a PairProvider");
  }
  return context;
};

import React, { useState, createContext } from "react";

export const AppSubContext = createContext();

export const AppSubProvider = props => {
  var [dataset, setDataset] = useState([]);

  return (
    <AppSubContext.Provider value={[dataset, setDataset]}>
      {props.children}
    </AppSubContext.Provider>
  );
};

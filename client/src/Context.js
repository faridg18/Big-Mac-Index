import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppProvider = props => {
  var [data, setData] = useState({
    country: "waiting for server",
    amount: 0.00,
    countryIndex: {index : 0}
  });

  return (
    <AppContext.Provider value={[data, setData]}>
      {props.children}
    </AppContext.Provider>
  );
};

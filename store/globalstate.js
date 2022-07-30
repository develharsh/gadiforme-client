import { createContext, useReducer } from "react";
import reducers from "./reducers";
// import { ACTIONS } from "./actions";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  let initialState = {};
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

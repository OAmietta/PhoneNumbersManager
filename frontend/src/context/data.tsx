import React, { createContext, useState, ReactNode } from "react";
import { IContext, IPhoneNumber, IUser } from "../interfaces";

// Create the context with a default value
const DataContext = createContext<IContext | undefined>(undefined);

// Create a provider component
const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [availableNumbers, setAvailableNumbers] = useState<IPhoneNumber[]>([]);
  const [users, setUsers] = useState<Array<IUser>>([]);

  return (
    <DataContext.Provider
      value={{ availableNumbers, setAvailableNumbers, users, setUsers }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };

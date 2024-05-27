import React, { createContext, useState, ReactNode } from "react";
import { IContext, IPhoneNumber, IUser } from "../interfaces";

// Create the context with a default value
const DataContext = createContext<IContext | undefined>(undefined);

// Create a provider component
const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [availableNumbers, setAvailableNumbers] = useState<IPhoneNumber[]>([]);
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <DataContext.Provider
      value={{
        availableNumbers,
        setAvailableNumbers,
        users,
        setUsers,
        loading,
        setLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };

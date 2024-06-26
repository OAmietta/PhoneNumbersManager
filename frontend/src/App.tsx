/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserList from "./pages/UserList";
import { useEffect, useState } from "react";
import { services } from "./services";
import { IOrganisation, IPhoneNumber, IResponse } from "./interfaces";
import { useDataContext } from "./hooks/useDataContext";

function App() {
  const { setAvailableNumbers, setLoading } = useDataContext();
  const [organisations, setOrganisations] = useState<Array<IOrganisation>>([]);

  useEffect(() => {
    services
      .populateDatabase()
      .then(() => {
        setTimeout(() => {
          services
            .getAvailablePhoneNumbers()
            .then((res: IResponse<IPhoneNumber>) => {
              setAvailableNumbers(res.data);
            })
            .catch((error: string) => {
              throw new Error(error);
            });
          services
            .getOrganisations()
            .then((res: IResponse<IOrganisation>) => {
              setOrganisations(res.data);
            })
            .catch((error: string) => {
              throw new Error(error);
            });
          setLoading(false);
        }, 1000);
      })
      .catch((error: string) => {
        throw new Error(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home organisations={organisations} />} />
        <Route path="/users/:id" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

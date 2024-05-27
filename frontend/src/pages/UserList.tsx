/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { services } from "../services";
import { useNavigate, useParams } from "react-router-dom";
import { IResponse, IUser } from "../interfaces";
import Table from "../components/Table";
import { useDataContext } from "../hooks/useDataContext";

export default function UserList() {
  const { id } = useParams();
  const { users, setUsers } = useDataContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (id != undefined) {
      services
        .getUsers(parseInt(id))
        .then((res: IResponse<IUser>) => {
          setUsers(res.data);
        })
        .catch((error: string) => {
          throw new Error(error);
        });
    }
  }, [id]);

  const handleBack = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(-1);
  };

  return (
    <div className="h-[100vh] p-5">
      <button className="m-3 p-2" onClick={() => handleBack()}>
        {"< Back"}
      </button>
      <Table users={users} />
    </div>
  );
}

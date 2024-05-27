import { useState } from "react";
import { services } from "../services";
import { useDataContext } from "./useDataContext";
import { IPhoneNumber, IResponse, IUser } from "../interfaces";

export default function useModal(user: IUser, id: string | undefined) {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { availableNumbers, setAvailableNumbers, setUsers } = useDataContext();

  const handleClose = () => {
    setSearchTerm("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleAllocate = async (searchTerm: string) => {
    handleClose();
    services
      .allocatePhoneNumber(user.idPassport, user.name, user.surname, searchTerm)
      .then((res: object) => {
        setAvailableNumbers(
          availableNumbers.filter(
            (item: IPhoneNumber) => item.phoneNumber != searchTerm
          )
        );
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
        return res;
      })
      .catch((error: string) => {
        throw new Error(error);
      });
    setSearchTerm("");
  };
  return {
    show,
    availableNumbers,
    searchTerm,
    setSearchTerm,
    handleShow,
    handleClose,
    handleAllocate,
  };
}

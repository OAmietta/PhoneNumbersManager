interface IOrganisation {
  id: number;
  name: string;
}

interface IUser {
  id: string;
  idPassport: string;
  name: string;
  surname: string;
  phoneNumber: string;
  phoneAllocated: boolean;
  organisationID: number;
}

interface IPhoneNumber {
  phoneNumber: string;
  available: boolean;
}

interface IResponse<T> {
  data: Array<T>;
  message: string;
}

//Context data
interface IContext {
  availableNumbers: IPhoneNumber[];
  setAvailableNumbers: React.Dispatch<React.SetStateAction<IPhoneNumber[]>>;
  users: IUser[];
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

export type { IOrganisation, IUser, IPhoneNumber, IResponse, IContext };

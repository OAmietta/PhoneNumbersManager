interface IUser {
  id: string;
  idPassport: string;
  name: string;
  surname: string;
  phoneNumber: string;
  phoneAllocated: boolean;
  organisationID: number;
}

interface IOrganisation {
  id: number;
  name: string;
}

interface IPhoneNumber {
  phoneNumber: string;
  available: boolean;
}

export { IUser, IOrganisation, IPhoneNumber };

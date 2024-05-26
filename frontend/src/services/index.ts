import { IOrganisation, IUser } from "../interfaces";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};
const url = "http://localhost:3000";

export const services = {
  populateDatabase: async () => {
    const res = await fetch(`${url}/api/populateDatabase`, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
    return res;
  },
  getAvailablePhoneNumbers: async () => {
    const res = await fetch(`${url}/api/getAvailablePhoneNumbers`, options)
      .then((response) => response.json())
      .catch((err) => console.error(err));
    return res;
  },
  getOrganisations: async () => {
    const res = await fetch(`${url}/api/getOrganisations`, options)
      .then((response) => response.json())
      .catch((err) => console.error(err));
    return res;
  },
  getUsers: async (orgID: IOrganisation["id"]) => {
    const res = await fetch(`${url}/api/getUsers/${orgID}`, options)
      .then((response) => response.json())
      .catch((err) => console.error(err));
    return res;
  },
  allocatePhoneNumber: async (
    idPassport: IUser["idPassport"],
    name: IUser["name"],
    surname: IUser["surname"],
    phoneNumber: IUser["phoneNumber"]
  ) => {
    const res = await fetch(
      `${url}/api/allocateNumber/${idPassport}/${name}/${surname}/${phoneNumber}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
    return res;
  },
};

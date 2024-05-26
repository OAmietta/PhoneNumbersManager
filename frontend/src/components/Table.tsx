import { IUser } from "../interfaces";
import ModalButton from "./Modal";

export default function Table(props: { users: Array<IUser> }) {
  const { users } = props;

  return (
    <table className="text-left w-full sm:w-[95%] m-auto divide-y divide-gray-500/20">
      <thead>
        <tr className="text-zinc-400 text-xs sm:text-sm font-light px-1 sm:px-4 pb-2">
          <th>ID/Passport</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Phone</th>
        </tr>
      </thead>

      <tbody>
        <tr className="h-4"></tr>
        {users != undefined && users.length > 0 ? (
          users?.map((user) => {
            return (
              <tr
                key={user.id}
                className="border-spacing-0 text-gray-300 text-xs sm:text-sm font-light overflow-hidden transition duration-300 px-3 sm:px-4 py-4"
              >
                <td>
                  <h1>{user.idPassport}</h1>
                </td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>
                  {user.phoneAllocated ? (
                    user.phoneNumber
                  ) : (
                    <ModalButton
                      label={"+"}
                      user={user}
                      confirmLabel="Allocate number"
                      cancelLabel="Cancel"
                    />
                  )}
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td className="text-xs sm:text-sm">No users found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

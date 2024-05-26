import SearchableSelect from "./SearchableSelect";
import { IUser } from "../interfaces";
import { useParams } from "react-router-dom";
import useModal from "../hooks/useModal";

export default function ModalButton(props: {
  label: string;
  user: IUser;
  confirmLabel: string;
  cancelLabel: string;
}) {
  const { label, user, confirmLabel, cancelLabel } = props;
  const { id } = useParams();
  const {
    show,
    availableNumbers,
    searchTerm,
    setSearchTerm,
    handleShow,
    handleClose,
    handleAllocate,
  } = useModal(user, id?.toString());

  return (
    <>
      <button
        className="bg-zinc-800 text-white font-bold px-2 rounded cursor-pointer"
        onClick={handleShow}
      >
        {label}
      </button>

      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleClose}
          ></div>
          <div className="bg-white rounded-lg overflow-visible shadow-xl transform transition-all md:max-w-sm max-w-[90vw] w-full">
            <div className="flex justify-between px-4 py-4 text-black">
              <div>
                <p className="font-semibold">ID/Passport</p>
                <p>{user.idPassport}</p>
              </div>
              <div>
                <p className="font-semibold">Name</p>
                <p>{user.name}</p>
              </div>
              <div>
                <p className="font-semibold">Surname</p>
                <p>{user.surname}</p>
              </div>
            </div>
            <div className="px-4 pb-2 text-black">
              <p className="font-semibold">Phone Number</p>
            </div>
            <div className="ml-4 pb-2">
              <SearchableSelect
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                availableNumbers={availableNumbers}
              />
            </div>

            <div className="bg-gray-100 rounded-lg px-4 py-3 flex justify-end">
              <button
                className=" bg-gray-400 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleClose}
              >
                {cancelLabel}
              </button>
              <button
                className="bg-zinc-800 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleAllocate(searchTerm)}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

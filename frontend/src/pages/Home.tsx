import Card from "../components/Card";
import Spinner from "../components/spinner";
import { useDataContext } from "../hooks/useDataContext";
import { IOrganisation } from "../interfaces";

export default function Home(props: { organisations: Array<IOrganisation> }) {
  const { organisations } = props;
  const { loading } = useDataContext();

  function renderOrganisations() {
    if (organisations.length > 0) {
      return organisations.map((item) => {
        return (
          <div key={item.id} className="">
            <Card title={item.name} id={item.id} />
          </div>
        );
      });
    } else {
      return <div>Organisations not found.</div>;
    }
  }
  return (
    <div className="w-[85vw] min-h-[100vh] p-8 flex flex-col items-center justify-center gap-10">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="sm:text-xl text-white">SELECT ORGANISATION</h1>
          <div className="flex justify-center items-center text-center gap-4 flex-wrap">
            {renderOrganisations()}
          </div>
        </>
      )}
    </div>
  );
}

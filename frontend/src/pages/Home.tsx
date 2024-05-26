import Card from "../components/Card";
import { IOrganisation } from "../interfaces";

export default function Home(props: { organisations: Array<IOrganisation> }) {
  const { organisations } = props;

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
      <h1 className="sm:text-2xl">Phone Numbers Manager</h1>
      <div className="flex justify-center items-center text-center gap-4 flex-wrap">
        {renderOrganisations()}
      </div>
    </div>
  );
}

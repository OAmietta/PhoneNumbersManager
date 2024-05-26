import { Link } from "react-router-dom";

export default function Card(props: { title: string; id: number }) {
  const { title, id } = props;
  return (
    <Link
      className="bg-zinc-800 h-56 w-56 flex items-center justify-center rounded-md hover:scale-105 transition-all"
      style={{ textDecoration: "none" }}
      to={`/users/${id}`}
    >
      {title}
    </Link>
  );
}

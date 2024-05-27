import "./spinner.css";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center z-40 h-screen w-full opacity-60">
      <div className="container w-20">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
}

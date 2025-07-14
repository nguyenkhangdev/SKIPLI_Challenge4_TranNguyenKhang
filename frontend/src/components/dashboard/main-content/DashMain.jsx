import logo from "../../../assets/skipli.svg";

export default function DashMain() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <img src={logo} alt="SKIPLI logo" className="w-sm" />
      <h3 className="text-red-700 font-semibold text-2xl">DashBoard</h3>
    </div>
  );
}

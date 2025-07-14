import { FaUser, FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Link
        to="/employee"
        className="hover:cursor-pointer flex flex-col items-center shadow-xl bg-blue-300 p-6 rounded-md w-60"
      >
        <FaUser className="h-20 w-20" />
        <h2 className="text-5xl font-bold">Employee</h2>
      </Link>
      <Link
        to="/manager/signin"
        className="hover:cursor-pointer flex flex-col items-center shadow-xl bg-orange-300 p-6 rounded-md w-60"
      >
        <FaUserTie className="h-20 w-20" />
        <h2 className="text-5xl font-bold">Manager</h2>
      </Link>
    </div>
  );
}

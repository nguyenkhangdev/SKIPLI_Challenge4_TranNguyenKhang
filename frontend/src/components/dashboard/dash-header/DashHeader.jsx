import { Link } from "react-router-dom";
import logo from "../../../assets/skipli.svg";
import NotificationBox from "./NotificationBox";
import UserDropdown from "./UserDropdown";

export default function DashHeader() {
  return (
    <div className="w-full flex flex-row items-center justify-between py-5 px-7 md:px-10 lg:px-14 ">
      <Link to={"/"}>
        <img
          src={logo}
          alt="SKIPLI - nguyenkhangdev@gmail.com"
          className="h-10"
        />
      </Link>
      <div className="flex flex-row gap-7 items-center">
        <NotificationBox />
        <UserDropdown />
      </div>
    </div>
  );
}

import DashHeader from "../components/dashboard/dash-header/DashHeader";
import DashSidebar from "../components/dashboard/DashSidebar";
import { useState } from "react";
import DashManageEmployee from "../components/dashboard/main-content/DashManageEmployee";
import DashManageTask from "../components/dashboard/main-content/DashManageTask";
import DashMessage from "../components/dashboard/main-content/DashMessage";

export default function DashBoard() {
  const [tab, setTab] = useState("manage-employee");

  // one more, we can set URL prarams and wrap <Link><Link/> in Sidebar <li/>
  // useEffect(() => {
  //   //logic get tab in URL params then setTab
  // }, [  useLocation().search]);

  return (
    <div className="min-h-screen w-screen min-w-[320px] flex flex-col">
      <DashHeader />

      <div className="flex flex-row flex-grow">
        <DashSidebar tab={tab} setTab={setTab} />
        <div className="flex-grow p-4 bg-gray-50 rounded-tl-md">
          {tab === "manage-employee" && <DashManageEmployee />}
          {tab === "manage-task" && <DashManageTask />}
          {tab === "message" && <DashMessage />}
        </div>
      </div>
    </div>
  );
}

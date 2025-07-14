import { useState } from "react";
import { useAuth } from "../../contexts/UseAuth";
import { FloatButton } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const menuItems = [
  { key: "manage-employee", label: "Manage Employee", role: ["manager"] },
  { key: "manage-task", label: "Manage Task", role: ["manager", "employee"] },
  { key: "message", label: "Message", role: ["manager", "employee"] },
];

export default function DashSidebar({ tab, setTab }) {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <FloatButton
        icon={<MenuOutlined />}
        onClick={() => setIsVisible((prev) => !prev)}
        style={{ left: 16, bottom: 16, right: "auto" }}
      />
      {isVisible && (
        <div className="min-w-[240px] h-screen p-5 pt-8">
          <ul className="flex flex-col gap-2">
            {menuItems
              .filter((item) => item.role.includes(user?.role))
              .map((item) => (
                <li
                  key={item.key}
                  onClick={() => setTab(item.key)}
                  className={`flex items-center gap-2 p-2 text-[#2C7BE5] rounded cursor-pointer transition-colors
              ${
                tab === item.key
                  ? "bg-[#E7F1FF]  border border-[#2C7BE5] border-r-[3px]"
                  : ""
              }`}
                >
                  <span>{item.label}</span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}

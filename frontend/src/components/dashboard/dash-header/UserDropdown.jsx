import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import avatarImg from "../../../assets/avatar.svg";
import { useAuth } from "../../../contexts/UseAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/axios";

export default function UserDropdown() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  //other option is use npm react-cookie
  const handleSignout = async () => {
    try {
      const res = await api.delete("/signout");
      if (res.status) {
        toast.success(res.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(`Sign out failure: ${res.message}`);
      }
    } catch (error) {
      toast.error(`Sign out failure: ${error.message}`);
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <div>
          <p className="font-semibold">{user?.role}</p>
          <p>{user?.name}</p>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "My Account",
    },

    {
      key: "3",
      label: "Profile",
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: "Sign out",
      icon: <LogoutOutlined />,
      onClick: handleSignout,
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <div className="hover:cursor-pointer flex flex-row justify-center">
          <img
            src={avatarImg}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <DownOutlined className="text-xl" />
        </div>
      </a>
    </Dropdown>
  );
}

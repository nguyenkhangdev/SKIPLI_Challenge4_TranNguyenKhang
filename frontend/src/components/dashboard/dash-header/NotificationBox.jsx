import { Badge, Dropdown, Space } from "antd";
import { BellOutlined } from "@ant-design/icons";

//in production, render intems by map()
const items = [
  {
    key: "1",
    label: <p>Hello Sir!</p>,
  },
  {
    key: "2",
    label: <p>My name is Tran Nguyen Khang</p>,
  },
];
export default function NotificationBox() {
  return (
    <Dropdown menu={{ items }} className="mt-1">
      <a onClick={(e) => e.preventDefault()}>
        <Space className="hover:cursor-pointer">
          <Badge count={items.length} size="small">
            <BellOutlined style={{ color: "#4a5565" }} className="text-3xl" />
          </Badge>
        </Space>
      </a>
    </Dropdown>
  );
}

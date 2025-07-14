import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

export default function DashMessage() {
  //Get all chat rooms that the user can be access,
  //then show "list chat room".

  //when user click on any chat room in list chat rooms,
  //show the componnet chat room with chatRoomId
  //create socket and load message that chat room.
  //socket sendMessage....

  return (
    <div className="flex h-full gap-4">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-100 p-4 rounded-2xl flex flex-col gap-4">
        <div>
          <h2 className="font-semibold text-md">All Message</h2>
          <Input
            className="mt-2"
            placeholder="Search"
            size="large"
            allowClear
          />
        </div>

        {/* list chat room  */}
        {["employee1", "employee2", "employee3"].map((employee, index) => (
          // component ChatRoom
          <div key={index} className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <UserOutlined className="text-gray-600" />
              </div>
              <span className="font-medium text-sm">{employee}</span>
            </div>
            <p className="text-sm mt-1 text-gray-800">Hello</p>
          </div>
        ))}
      </div>

      {/* chat area */}
      <div className="w-2/3 bg-gray-100 p-4 rounded-2xl flex flex-col justify-between">
        {/* Messages display area  ) */}
        <div className="flex-1"></div>

        {/* reply input */}
        <div className="bg-gray-300 p-4 rounded-b-2xl">
          <Input
            placeholder="Reply message"
            className="rounded-xl"
            size="large"
          />
        </div>
      </div>
    </div>
  );
}

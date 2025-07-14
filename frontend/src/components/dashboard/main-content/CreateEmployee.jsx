import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import { useState } from "react";
import api from "../../../services/axios";
import { toast } from "react-toastify";

export default function CreateEmployee({ fetchData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
    department: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOk = async () => {
    try {
      const res = await api.post(`/CreateEmployee`, formData);
      if (res.status) {
        toast.success(res.message);
        fetchData();
        setIsModalOpen(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        size="large"
        color="primary"
        variant="outlined"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Create Employee
      </Button>
      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"800px"}
      >
        <h2 className="text-3xl font-semibold text-center mb-12 mt-3 ">
          Create Employee
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 px-5">
          <div>
            <label className="block mb-4">Employee Name</label>
            <Input
              className="h-14 text-lg md:w"
              size="large"
              name="name"
              value={formData.name}
              onChange={handleChange}
             />
          </div>
          <div>
            <label className="block mb-4">Phone Number</label>
            <Input
              className="h-14 text-lg md:w"
              size="large"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
             />
          </div>
          <div>
            <label className="block mb-4">Email Address</label>
            <Input
              className="h-14 text-lg md:w"
              size="large"
              name="email"
              value={formData.email}
              onChange={handleChange}
             />
          </div>
          <div>
            <label className="block mb-4">Role</label>
            <Input
              className="h-14 text-lg"
              size="large"
              name="role"
              value={formData.role}
              onChange={handleChange}
             />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-4">Address</label>
            <Input
              className="h-14 text-lg"
              size="large"
              name="department"
              value={formData.department}
              onChange={handleChange}
             />
          </div>
        </div>
      </Modal>
    </>
  );
}

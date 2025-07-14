import { Button, Input, Popconfirm, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../../services/axios";
import { toast } from "react-toastify";
import CreateEmployee from "./CreateEmployee";

export default function DashManageEmployee() {
  const [employees, setEmployees] = useState([]);
  const fetchData = async () => {
    try {
      const res = await api.get("/GetEmployees");
      if (res.status) {
        setEmployees(res.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleEdit = (record) => {
    toast.success("handleEdit", record);
  };

  const handleDelete = async (record) => {
    try {
      const res = await api.delete(`/DeleteEmployee/${record.email}`);
      if (res.status) {
        toast.success(res.message);
        fetchData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const columns = [
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      key: "status",
      render: () => (
        <Tag
          color="green"
          style={{ backgroundColor: "#e6fffb", borderColor: "#b7eb8f" }}
        >
          Active
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      //render: (text, record, index) => JSX
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this employee?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  console.log(employees);
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-semibold pb-5">Manage Employee</h2>
      <div className="flex flex-row items-center justify-between px-3">
        <h3 className="flex flex-row items-center font-semibold text-2xl gap-2">
          <span>{employees.length}</span>
          <span>Employee</span>
        </h3>
        <div className="flex flex-row items-center gap-3">
          <CreateEmployee fetchData={fetchData} />
          <Input
            size="large"
            placeholder="Filter"
            prefix={<SearchOutlined style={{ paddingRight: 10 }} />}
            style={{ paddingLeft: 20 }}
          />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={employees.map((e, index) => ({ ...e, key: index }))}
      />
    </div>
  );
}

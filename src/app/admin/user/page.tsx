"use client";
import { UserType } from "@/app/interfaces/user.interface";
import { Avatar, Form, Space, Table, TableProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import dateFormat from "dateformat";

export default function User() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [data, setData] = useState<UserType[]>([]);
  const [form] = Form.useForm();

  const columns = useMemo<TableProps<UserType>["columns"]>(() => {
    return [
      {
        title: "Display name",
        dataIndex: "displayName",
        key: "displayName",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Picture",
        dataIndex: "pictureUrl",
        key: "pictureUrl",
        render: (_, { pictureUrl }) => <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={pictureUrl} />,
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (_, { createdAt }) => <>{dateFormat(createdAt, "fullDate")}</>,
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <a>Delete</a>
          </Space>
        ),
      },
    ];
  }, []);

  const fetchPlayer = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_PATH}/player`)
      .then((res) => {
        return res.json();
      })
      .then((r) => {
        setData(r?.data);
      });
  };

  useEffect(() => {
    fetchPlayer();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Table className="w-full" columns={columns} dataSource={data} />
    </main>
  );
}

"use client";
import { UserType } from "@/app/interfaces/user.interface";
import { Avatar, Button, DatePicker, Form, Input, InputNumber, Modal, Select, Space, Switch, Table, TableProps, Tag, TimePicker, message } from "antd";
import { useEffect, useMemo, useState } from "react";
import dateFormat, { masks } from "dateformat";
import { RotateSaingGroupType } from "@/app/interfaces/room.interface";
import { dayOyMonthOptions, dayOyWeekOptions, periodOptions, statusGroupOptions } from "@/app/utils/helper";
import { DayOfMonth, DayOfWeek } from "@/app/constants/enum";
import dayjs from "dayjs";
import { convertDateToString, convertStringToDate } from "@/app/utils/datetime";
const ROOM_PATH = "rotateSavingGroup";
const TIME_FORMAT = "HH:mm";
export default function Room() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [data, setData] = useState<UserType[]>([]);
  const [form] = Form.useForm<RotateSaingGroupType>();

  const columns = useMemo<TableProps<any>["columns"]>(() => {
    return [
      {
        title: "ownerId",
        dataIndex: "ownerId",
        key: "ownerId",
        render: (item) => {
          return <>{item?.displayName}</>;
        },
      },
      {
        title: "players",
        dataIndex: "players",
        key: "players",
        render: (players) => {
          return <>{players?.length}</>;
        },
      },
      {
        title: "rotateAmount",
        dataIndex: "rotateAmount",
        key: "rotateAmount",
      },
      {
        title: "minBitAmount",
        dataIndex: "minBitAmount",
        key: "minBitAmount",
      },
      {
        title: "maxBitAmount",
        dataIndex: "maxBitAmount",
        key: "maxBitAmount",
      },
      {
        title: "Period bit Time",
        dataIndex: "bitTime",
        key: "bitTime",
        render: (data) => {
          return <>{data?.dayOfWeek ? `${data?.dayOfWeek}, ${data?.time}` : `${data?.dayOfMonth}, ${data?.time}`}</>;
        },
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <a
              onClick={() => {
                form.setFieldsValue({
                  ...record,
                  bitTime: {
                    ...record.bitTime,
                    time: convertStringToDate(record?.bitTime?.time, TIME_FORMAT),
                  },
                  startPlayDate: convertStringToDate(record?.startPlayDate),
                });
                setOpen(true);
              }}
            >
              Edit
            </a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];
  }, []);

  const fetchRoom = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_PATH}/${ROOM_PATH}`)
      .then((res) => {
        return res.json();
      })
      .then((r) => {
        setData(r?.data);
      });
  };

  const putRoom = () => {
    const formValues = form.getFieldsValue();
    const key = `save-${formValues?._id}`;
    message.loading({ content: "Peocessing", key });
    if (formValues?._id) {
      fetch(`${process.env.NEXT_PUBLIC_API_PATH}/${ROOM_PATH}/${formValues?._id}`, {
        method: "PATCH",
        body: JSON.stringify({ ...formValues, ...{ bitTime: { ...formValues.bitTime, time: convertDateToString(formValues.bitTime?.time, TIME_FORMAT) } } }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          message.success({ content: "Update successful", key, duration: 2 });
          fetchRoom();
        });
    } else {
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const handleOk = () => {
    form.validateFields().then((values) => {
      putRoom();
      form.resetFields();
      setOpen(false);
    });
    // setModalText('The modal will be closed after two seconds');
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setOpen(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Table className="w-full" columns={columns} dataSource={data} />

      {/* Edit Modal */}
      <Modal centered title="Title" open={open} onOk={handleOk} confirmLoading={confirmLoading} destroyOnClose={true} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>

          <Form.Item name={"rotateAmount"} label="rotateAmount" rules={[{ required: true, message: "Please input!" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name={"minBitAmount"} label="minBitAmount" rules={[{ required: true, message: "Please input!" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name={"maxBitAmount"} label="maxBitAmount" rules={[{ required: true, message: "Please input!" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name={"systemRandomPlayer"} label="Switch" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name={"period"} label="Period">
            <Select options={periodOptions} />
          </Form.Item>
          <Form.Item name={"roomStatus"} label="Room Status">
            <Select options={statusGroupOptions} />
          </Form.Item>

          <Form.Item name={["bitTime", "dayOfWeek"]} label="Day Of Week">
            <Select options={dayOyWeekOptions} />
          </Form.Item>
          <Form.Item name={["bitTime", "dayOfMonth"]} label="Day Of Month">
            <Select options={dayOyMonthOptions} />
          </Form.Item>
          <Form.Item name={["bitTime", "time"]} label="TimePicker">
            <TimePicker
              format={TIME_FORMAT}
              value={dayjs("12:08", TIME_FORMAT)}
              // value={dayjs(form.getFieldValue('bitTime')?.time, TIME_FORMAT)}
            />
          </Form.Item>
          <Form.Item name={"startPlayDate"} label="Start play date">
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
}

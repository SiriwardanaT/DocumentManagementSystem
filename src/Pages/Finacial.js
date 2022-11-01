/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../src/App.css";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Space,
  Table,
  Tag,
  Modal,
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
} from "antd";
function Finacial() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getAllPaymentData();
  });

  const sprint = Form.useWatch("sprint", form);
  const projectId = Form.useWatch("projectId", form);
  const projectName = Form.useWatch("projectName", form);
  const cilentName = Form.useWatch("cilentName", form);
  const paymentForSprint = Form.useWatch("paymentForSprint", form);
  const paymentDate = Form.useWatch("paymentDate", form);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await axios
      .get("http://localhost:5000/payment/getPayments")
      .then((res) => {
        setPayments(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const deletePayment = async (key, e) => {
    console.log("key", key);
    await axios
      .delete(`http://localhost:5000/payment/deletePayment/${key}`)
      .then((res) => {
        alert("deleted");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDrawer = (key, e) => {
    getData(key, e);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const getData=async(key,e)=>{
    await axios
    .get(`http://localhost:5000/payment/getDataFor/${key}`)
    .then((res) => {
     const {sprint} = res;
    })
    .catch((err) => {
      alert(err);
    });
  }

  const columns = [
    {
      title: "project Id",
      dataIndex: "projectId",
      key: "projectId",
    },
    {
      title: "project Name",
      dataIndex: "projectName",
      key: "projectName",
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: (text) => <a>{text}</a>,
    },
    {
      title: "cilent Name",
      dataIndex: "cilentName",
      key: "cilentName",
    },
    {
      title: "Sprint Number",
      dataIndex: "sprint",
      key: "sprint",
    },
    {
      title: "Payment Amount",
      dataIndex: "paymentForSprint",
      key: "paymentForSprint",
    },
    {
        title: "Date",
        dataIndex: "paymentDate",
        key: "paymentDate",
      },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={(e) => {
               setIsEdit(true);
              showDrawer(record._id, e);
            }}
          >
            Update
          </a>
          <a
            onClick={(e) => {
              console.log("record", record);
              console.log("id", record._id);

              deletePayment(record._id, e);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  const getAllPaymentData = async (req, res) => {
    await axios
      .get("http://localhost:5000/payment/getPayments")
      .then((res) => {
        // console.log("res",res)
        setPayments(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const onFinish = async (e) => {
    console.log("check");
    // e.preventDefault();

    const newTask = {
        projectId,
        projectName,
        cilentName,
        sprint,
        paymentForSprint,
        paymentDate
    };

    await axios
      .post("http://localhost:5000/payment/createPayments", newTask)
      .then(() => {
        alert("item added to task entry");
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div className="App" style={{ paddingTop: "10px" }}>
      <div className="titleName">
        <h1>Payment Entry</h1>
      </div>
      <div>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          New Payment
        </Button>
      </div>
      <Drawer
        title={isEdit ? 'Update a Payment Entry' : 'Create a New Payment Entry'}
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="projectId"
                label="project Id"
                rules={[
                  {
                    required: true,
                    message: "Please enter projectId",
                  },
                ]}
              
               
              >
                <Input value={isEdit ? {sprint} : ""}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="projectName"
                label="project Name"
                // onFieldChange={setUseCaseId}
                rules={[
                  {
                    required: true,
                    message: "Please enter projectName",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="cilentName"
                label="cilent Name"
                rules={[
                  {
                    required: true,
                    message: "Please cilentName",
                  },
                ]}
              >
                <Input />
                
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="sprint"
                label="Sprint Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter sprint number",
                  },
                ]}
              >
                
                 <Input  />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="paymentForSprint"
                label="Payment amount"
                // onFieldChange={setAnyOtherConcerns}
                rules={[
                  {
                    required: true,
                    message: "please enter payment For Sprint",
                  },
                ]}
              >
                  <Input  />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="paymentDate"
                label="Date"
                // onFieldChange={setAnyOtherConcerns}
                rules={[
                  {
                    required: true,
                    message: "please enter payment Date",
                  },
                ]}
              >
                  <DatePicker  />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
      <div style={{ margin: "10px" }}>
        <Table columns={columns} dataSource={payments} />
      </div>

      {/* <Modal
        title="Delete Confirmation"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>Are you sure to delete this record</h3>
      </Modal> */}
    </div>
  );
}

export default Finacial;
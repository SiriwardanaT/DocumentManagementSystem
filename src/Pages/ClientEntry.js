import "../../src/App.css";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import ClentEntryList from "../Components/ClientEntry/ClientEntryList";
import {
  Space,
  Button,
  Col,
  Drawer,
  message,
  Form,
  Input,
  Row,
  Select,
} from "antd";
function ClientEntry() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);


  const clientName = Form.useWatch('clientName', form)
  const CompanyName = Form.useWatch('CompanyName', form)
  const owner = Form.useWatch('owner', form)
  const documentApproved = Form.useWatch('documentApproved', form)
  const sector = Form.useWatch('sector', form)
  const description = Form.useWatch('description', form)

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = () => {

    const payload = {
      clientName: clientName,
      CompanyName: CompanyName,
      owner: owner,
      documentApproved: documentApproved,
      sector: sector,
      description: description
    }
    //api end point

  }



  return (
    <div className="App" style={{ paddingTop: "10px" }}>
      <div className="titleName">
        <h1>Client Entry</h1>
      </div>
      <div>
        <Button type="primary" style={{ position: "relative", left: '44%' }} onClick={showDrawer} icon={<PlusOutlined />}>
          New account
        </Button>
      </div>
      <Drawer
        title="Create a New Client Entry"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form form={form} layout="vertical" autoComplete="off" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="clientName"
                label="Client Name"
                rules={[
                  {
                    required: true,
                  }
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="CompanyName"
                label="Company Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter Company Name",
                  },
                ]}
              >
                <Input placeholder="Please enter Company Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="owner"
                label="Owner"
                rules={[
                  {
                    required: true
                  },
                ]}
              >
                <Select placeholder="Please select an owner">
                  <Option value="xiao">Member 1</Option>
                  <Option value="mao">Member 2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="sector"
                label="Sector"
                rules={[
                  {
                    required: true,
                    message: "Please choose the type",
                  },
                ]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="0">Private</Option>
                  <Option value="1">Goverment</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="documentApproved"
                label="Document Approve"
                rules={[
                  {
                    required: true,
                    message: "Please choose the approver",
                  },
                ]}
              >
                <Select placeholder="Please choose the document approve status ">
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </Form.Item>
            </Col>

          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter url description"
                />
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

      {/* Table view component */}
      <ClentEntryList />
    </div>
  );
}

export default ClientEntry;

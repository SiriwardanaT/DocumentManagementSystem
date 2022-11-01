/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../src/App.css";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FinancialList from "../Components/FinancialEntry/FinancialList";
import {
  Space,
  Table,
  Button,
  Col,
  DatePicker,
  message,
  Drawer,
  Form,
  Input,
  Row,
} from "antd";
function Finacial() {
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [session,setSession] = useState("");



  const sprint = Form.useWatch("sprint", form);
  const projectId = Form.useWatch("projectId", form);
  const projectName = Form.useWatch("projectName", form);
  const cilentName = Form.useWatch("cilentName", form);
  const paymentForSprint = Form.useWatch("paymentForSprint", form);
  const paymentDate = Form.useWatch("paymentDate", form);



  const showDrawer = (record) => {
    setSession(record._id)
    form.setFieldsValue({
           projectId: record.projectId,
            projectName: record.projectName,
            cilentName: record.cilentName,
            sprint:record.sprint,
            paymentForSprint: record.paymentForSprint,
            paymentDate: record.paymentDate,
    });
    setOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

 
  const onClose = () => {
    setOpen(false);
  };

  

  const onFinish = async (e) => {
    console.log("check");
    // e.preventDefault();

    const newPayment = {
        projectId:projectId,
        projectName:projectName,
        cilentName: cilentName,
        sprint:sprint,
        paymentForSprint:paymentForSprint,
        paymentDate:paymentDate
    };

     //api end point
     if(session != null){
      axios.put('http://localhost:3001/payment/updatePayment/'+session,newPayment).then((res)=>{
        res.status == 200  ? message.success("Client Deleted Success") :message.success("Something Went wrong")
        window.location = "/finacial"
      }).catch((err)=>{
        message.error("Virtuza Server Error "+err)
      })
  }
  else{
    axios.post('http://localhost:3001/payment/createPayments',newPayment).then((res)=>{
        res.status == 201  ? message.success("Client Created Success") :message.success("Something Went wrong") 
        window.location = "/finacial"
    }).catch((err)=>{
        message.error("Virtuza Server Error "+err)
    })
  }
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
        title='Create a New Payment Entry'
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
                  <Input  />
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
     <FinancialList handleClick={showDrawer}/>
 
    
    </div>
  );
}

export default Finacial;
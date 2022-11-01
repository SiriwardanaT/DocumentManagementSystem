/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../src/App.css";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "../Components/TaskEntry/TaskList";
import {
  Space,
  Table,
  Button,
  Col,
  DatePicker,
  message,
  Select,
  Drawer,
  Form,
  Input,
  Row,
} from "antd";
function Task() {
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [session,setSession] = useState("");



  const sprint = Form.useWatch("sprint", form);
  const useCaseId = Form.useWatch("useCaseId", form);
  const taskDescription = Form.useWatch("taskDescription", form);
  const assignee = Form.useWatch("assignee", form);
  const anyOtherConcerns = Form.useWatch("anyOtherConcerns", form);

 
  

  const showDrawer = (record) => {
    setSession(record._id)
    form.setFieldsValue({
          sprint: record.sprint,
          useCaseId: record.useCaseId,
          taskDescription: record.taskDescription,
          assignee: record.assignee,
          anyOtherConcerns: record.anyOtherConcerns,
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
    
    // e.preventDefault();

    const newTask = {
      sprint:sprint,
      useCaseId:useCaseId,
      taskDescription:taskDescription,
      assignee:assignee,
      anyOtherConcerns:anyOtherConcerns,
    };

     //api end point
     if(session != null){
      axios.put('http://localhost:3001/task/updateTasks/'+session,newTask).then((res)=>{
        res.status == 200  ? message.success("Client Deleted Success") :message.success("Something Went wrong")
        window.location = "/task"
      }).catch((err)=>{
        message.error("Virtuza Server Error "+err)
      })
  }
  else{
    axios.post('http://localhost:3001/task/createTasks',newTask).then((res)=>{
        res.status == 201  ? message.success("Client Created Success") :message.success("Something Went wrong") 
        window.location = "/task"
    }).catch((err)=>{
        message.error("Virtuza Server Error "+err)
    })
  }
  };
  return (
    <div className="App" style={{ paddingTop: "10px" }}>
      <div className="titleName">
        <h1>Task Entry</h1>
      </div>
      <div>
      <Button type="primary" style={{ position: "relative", left: '44%' }} onClick={showDrawer} icon={<PlusOutlined />}>
          New Task
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
                name="sprint"
                label="Sprint Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter Sprint Number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="useCaseId"
                label="use Case Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter User case Number",
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
                name="taskDescription"
                label="Task"
                rules={[
                  {
                    required: true,
                    message: "Please enter the task",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="assignee"
                label="Assign Employee"
                rules={[
                  {
                    required: true,
                    message: "Please choose the employee",
                  },
                ]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="Nimal Perera">Nimal Perera</Option>
                  <Option value="Sasanka Lakshan">Sasanka Lakshan</Option>
                  <Option value="Avanthi Perera">Avanthi Perera</Option>
                  <Option value="Dinithi Wickramage">Dinithi Wickramage</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="anyOtherConcerns"
                label="Description about the task (not madatory)"
                rules={[
                  {
                    message: "please enter  description",
                  },
                ]}
              >
                <Input.TextArea rows={4} />
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
     <TaskList handleClick={showDrawer}/>
 
    
    </div>
  );
}

export default Task;
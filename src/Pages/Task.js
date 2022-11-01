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
function Task() {
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [data,setData]=useState({});
  const [sprint1,setSprint1]= useState(0);



  const sprint = Form.useWatch("sprint", form);
  const useCaseId = Form.useWatch("useCaseId", form);
  const taskDescription = Form.useWatch("taskDescription", form);
  const assignee = Form.useWatch("assignee", form);
  const anyOtherConcerns = Form.useWatch("anyOtherConcerns", form);
  let response;

  useEffect(() => {
    getAllData();
  });

  useEffect(()=>{
   console.log("data",data)
  },[data])

  const showModal = () => {
    setIsModalOpen(true);
  };

  // const handleOk = async () => {
  //   await axios
  //     .get("http://localhost:5000/task/getTasks")
  //     .then((res) => {
  //       setTasks(res.data);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };

  const deleteTask = async (key, e) => {
    console.log("key", key);
    await axios
      .delete(`http://localhost:5000/task/deleteTasks/${key}`)
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
    console.log("isEdit",isEdit);
    if(isEdit){
      console.log("Aaa")
      getData(key, e);
      setOpen(true);
    }else{
      console.log("bbbb")
      setOpen(true)
    }
   
   
  };
  const onClose = () => {
    setOpen(false);
  };

  const getData=async(key,e)=>{
    console.log("awaaa")
    await axios
    .get(`http://localhost:5000/task/getDataFor/${key}`)
    .then((res) => {
    console.log("res111",res.data)
  
   
      form.setFieldsValue({
        sprint: res.data.sprint,
        useCaseId: res.data.useCaseId,
        taskDescription: res.data.taskDescription,
        assignee:res.data.assignee,
        anyOtherConcerns: res.data.anyOtherConcerns,
       
      });
   
      const EditData=async(key)=>{
        const updateTask = {
          sprint,
          useCaseId,
          taskDescription,
          assignee,
          anyOtherConcerns,
        };
  
        await axios
        .post(`http://localhost:5000/task/updateTasks/${key}`, updateTask)
        .then(() => {
          alert("item added to task entry");
        })
        .catch((err) => {
          alert(err);
        });

      };
  
     
    })
    .catch((err) => {
      alert(err);
    });
  }

  const updateData=()=>{
    EditData();
  }

  const columns = [
    
    {
      title: "Sprint Number",
      dataIndex: "sprint",
      key: "sprint",
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Usecase number",
      dataIndex: "useCaseId",
      key: "useCaseId",
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
    },
    {
      title: "Task",
      dataIndex: "taskDescription",
      key:  "taskDescription",
    },
    {
      title: "Other Concerns",
      dataIndex: "anyOtherConcerns",
      key:  "anyOtherConcerns",
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

              deleteTask(record._id, e);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  const getAllData = async (req, res) => {
    await axios
      .get("http://localhost:5000/task/getTasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const onFinish = async (e) => {
    console.log("check");
    // e.preventDefault();
    if(!isEdit){
    const newTask = {
      sprint,
      useCaseId,
      taskDescription,
      assignee,
      anyOtherConcerns,
    };

    await axios
      .post("http://localhost:5000/task/createTasks", newTask)
      .then(() => {
        alert("item added to task entry");
      })
      .catch((err) => {
        alert(err);
      });
    }else{
      // const updateTask = {
      //   sprint,
      //   useCaseId,
      //   taskDescription,
      //   assignee,
      //   anyOtherConcerns,
      // };

      // await axios
      // .post("http://localhost:5000/task/updateTasks", updateTask)
      // .then(() => {
      //   alert("item added to task entry");
      // })
      // .catch((err) => {
      //   alert(err);
      // });
    }
  };
  return (
    <div className="App" style={{ paddingTop: "10px" }}>
      <div className="titleName">
        <h1>Task Entry</h1>
      </div>
      <div>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          New Task
        </Button>
      </div>
      <Drawer
        title={isEdit ? 'Update a Task Entry' : 'Create a New Task Entry'}
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
                <Input   />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="useCaseId"
                label="use Case Number"
                // onFieldChange={setUseCaseId}
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
                <Input  />
              
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
                <Input.TextArea
                  rows={4}
                 
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              {!isEdit ? ( <Button type="primary" htmlType="submit">
                Submit
              </Button>) :( <Button type="primary" htmlType="submit" onClick={()=>updateData()}>
                Update
              </Button>)}
             
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
      <div style={{ margin: "10px" }}>
        <Table columns={columns} dataSource={tasks} />
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

export default Task;

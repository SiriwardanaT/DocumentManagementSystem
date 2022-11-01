import '../../App.css';
import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Modal ,message} from 'antd';
import axios from 'axios';
function TaskList({handleClick}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [client, setclents] = useState([]);
  const [sessionid , setSessionId] = useState([]);
 
  useEffect(() => {
    axios.get('http://localhost:3001/task/getTasks').then((res)=>{
        setclents(res.data)
     }).catch((err)=>{
        console.log(err);
     })
  }, [])
  
  const columns = [
    {
      title: 'Sprint Number',
      dataIndex: 'sprint',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Usecase number',
      dataIndex: 'useCaseId',
    },
    {
      title: 'Assignee',
      dataIndex: 'assignee',
    },
    {
      title:"Task",
      dataIndex:"taskDescription"
    },
    {
        title: "Other Concerns",
        dataIndex: "anyOtherConcerns",
       
      },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={event => handleClick(record)}>Update</a>
          <a onClick={() => { showModal(record._id) }}>Delete</a>
        </Space>
      ),
    }
  ];


  const showModal = (recId) => {
    setSessionId(recId);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    axios.delete('http://localhost:3001/task/deleteTasks/'+sessionid).then((res)=>{
      res.status == 200 ? message.info("Task deleted Success") :message.success("Something Went wrong")
      window.location = "/task"
    }).catch((err)=>{
      message.error("Virtuza Server Error "+err)
    })
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ margin: '10px' }}>
      <Table columns={columns} dataSource={client} />
      <Modal title="Delete Confirmation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h3>Are you sure to delete this record</h3>
      </Modal>
    </div>
  );
}

export default TaskList;
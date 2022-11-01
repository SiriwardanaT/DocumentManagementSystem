import '../../App.css';
import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Modal ,message} from 'antd';
import axios from 'axios';
function FinancialList({handleClick}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [client, setclents] = useState([]);
  const [sessionid , setSessionId] = useState([]);
 
  useEffect(() => {
    axios.get('http://localhost:3001/payment/getPayments').then((res)=>{
        setclents(res.data)
     }).catch((err)=>{
        console.log(err);
     })
  }, [])
  
  const columns = [
    {
      title: 'project Id',
      dataIndex: 'projectId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'project Name',
      dataIndex: 'projectName',
    },
    {
      title: 'cilent Name',
      dataIndex: 'cilentName',
    },
    {
      title:"Sprint Number",
      dataIndex:"sprint"
    },
    {
        title: "Payment Amount",
        dataIndex: "paymentForSprint",
       
      },
      {
        title: "Date",
        dataIndex: "paymentDate",
       
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
    axios.delete('http://localhost:3001/payment/deletePayment/'+sessionid).then((res)=>{
      res.status == 200 ? message.info("Task deleted Success") :message.success("Something Went wrong")
      window.location = "/finacial"
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

export default FinancialList;
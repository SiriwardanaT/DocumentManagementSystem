import '../../App.css';
import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Modal } from 'antd';
function ClentEntryList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data retrive api call from backend
  useEffect(() => {
    console.log("data entry");
  }, [])
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (

        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>Update</a>
          <a onClick={() => { showModal() }}>Delete</a>
        </Space>
      ),
    }
  ];
  const clientData = [];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ margin: '10px' }}>
      <Table columns={columns} dataSource={clientData} />
      <Modal title="Delete Confirmation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h3>Are you sure to delete this record</h3>
      </Modal>
    </div>
  );
}

export default ClentEntryList;
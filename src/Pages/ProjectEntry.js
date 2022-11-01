import "../../src/App.css";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import ProjectList from "../Components/ProjectEntry/projectList";
import axios from "axios";
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
function ProjectEntry() {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [session,setSession] = useState("");


    const projectTitle = Form.useWatch('projectTitle', form)
    const client = Form.useWatch('client', form)
    const documentOwner = Form.useWatch('documentOwner', form)
    const documentApproved = Form.useWatch('documentApproved', form)
    const industry = Form.useWatch('industry', form)
    const description = Form.useWatch('description', form)

    const clientList = [{ "clientName": "tharindu" }, { "clientName": "kamal" }];

    const showDrawer = (record) => {
        setSession(record._id)
        form.setFieldsValue({
            projectTitle: record.projectTitle,
            client: record.client,
            documentOwner: record.documentOwner,
            documentApproved: record.documentApproved,
            industry: record.industry,
            description: record.description
          });
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onFinish = () => {
        const payload = {
            projectTitle: projectTitle,
            client: client,
            documentOwner: documentOwner,
            documentApproved: documentApproved,
            industry: industry,
            description: description
        }
        if(session != null){
            axios.put('http://localhost:3001/project/'+session,payload).then((res)=>{
            res.status == 200  ? message.success("Client Deleted Success") :message.success("Something Went wrong")
            window.location = "/projectentry"
            }).catch((err)=>{
            message.error("Virtuza Server Error "+err)
            })
        }
        else{
            //api end point
            axios.post('http://localhost:3001/project',payload).then((res)=>{
                res.status == 201  ? message.success("Client Created Success") :message.success("Something Went wrong") 
                window.location = "/projectentry"
            }).catch((err)=>{
                message.error("Virtuza Server Error "+err)
            })   
        }       
    }

    return (
        <div className="App" style={{ paddingTop: "10px" }}>
            <div className="titleName">
                <h1>Project Entry</h1>
            </div>
            <div>
                <Button type="primary" style={{ position: "relative", left: '44%' }} onClick={showDrawer} icon={<PlusOutlined />}>
                    New Project
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
                                name="projectTitle"
                                label="Project Title"
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
                                name="industry"
                                label="Industry"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter related industry",
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
                                name="documentOwner"
                                label="Document Owner"
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
                                name="client"
                                label="Client"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please choose the type",
                                    },
                                ]}
                            >
                                <Select placeholder="Please select related client">

                                    {clientList.map((client) => (
                                        <Option key={client.clientName}>{client.clientName}</Option>
                                    ))}
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
            <ProjectList handleClick={showDrawer} />
        </div>
    );
}

export default ProjectEntry;

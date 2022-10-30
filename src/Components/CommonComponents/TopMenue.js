import { Menu} from 'antd';
import { MailOutlined, FolderAddOutlined, FundProjectionScreenOutlined ,UsergroupAddOutlined} from '@ant-design/icons';
import { useNavigate,Link } from 'react-router-dom';
function TopMenue() {
    const navigate = useNavigate();
    return ( 
        <div className="App">
            <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
           
            <Menu.Item onClick={()=>{navigate('/')}} icon={<UsergroupAddOutlined />}>
                Dashboard
            </Menu.Item>
            <Menu.Item onClick={()=>{navigate('/cliententry')}} key="mail" icon={<UsergroupAddOutlined />}>
                Client Entry
            </Menu.Item>
            <Menu.Item onClick={()=>{navigate('/projectentry')}} icon={<FundProjectionScreenOutlined />}>
                Project Entry
            </Menu.Item>
            <Menu.Item onClick={()=>{navigate('/task')}} icon={<FolderAddOutlined />}>
                Project Task 
            </Menu.Item>
            <Menu.Item onClick={()=>{navigate('/finacial')}} icon={<MailOutlined />}>
                Finacial Management
            </Menu.Item>
            <Menu.Item  icon={<MailOutlined />}>
                Admin Login
            </Menu.Item>
            </Menu>
        </div>
    );
}
export default TopMenue;
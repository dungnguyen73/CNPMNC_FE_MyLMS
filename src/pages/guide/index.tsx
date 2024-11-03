import type { FC } from 'react';
import 'driver.js/dist/driver.min.css';
import { useState } from 'react';
import { Space, Tag, Dropdown, Menu, Modal, Form, Input, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import MyButton from '@/components/basic/button';
import MyTable from '@/components/core/table';

const { Column, ColumnGroup } = MyTable;
const { Option } = Select;

interface ColumnType {
  key: string;
  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  role: string;
}

interface User {
  id: number;
  username: string;
  fullname: string;
  gender: string;
  address: string;
  role: string;
}

const data: ColumnType[] = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    gender: 'Male',
    address: 'New York No. 1 Lake Park',
    role: 'Teacher',
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    gender: 'Male',
    address: 'London No. 1 Lake Park',
    role: 'Student',
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    gender: 'Female',
    address: 'Sidney No. 1 Lake Park',
    role: 'Teacher',
  },
];

// Extend the data array
new Array(30).fill(undefined).forEach((_, index) => {
  data.push({
    key: index + 4 + '',
    firstName: 'Joe' + index,
    lastName: 'Black' + index,
    gender: index % 2 === 0 ? 'Male' : 'Female',
    address: 'Sidney No. 1 Lake Park' + index,
    role: 'Teacher',
  });
});

const GuidePage: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [form] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState<ColumnType | null>(null);

  const handleAdd = () => {
    setIsEditMode(false);
    setViewMode(false);
    setCurrentRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleUpdate = (record: ColumnType) => {
    setIsEditMode(true);
    setViewMode(false);
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleView = (record: ColumnType) => {
    setIsEditMode(false);
    setViewMode(true);
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (isEditMode && currentRecord) {
        console.log("Updating record", values);
      } else {
        console.log("Adding record", values);
      }
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const menu = (record: ColumnType) => (
    <Menu>
      <Menu.Item key="view" onClick={() => handleView(record)}>View</Menu.Item>
      <Menu.Item key="update" onClick={() => handleUpdate(record)}>Update</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  return (
    <div className="user-manage">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        marginBottom: 16 
      }}>
        <MyButton type="primary" onClick={handleAdd}>
          Add
        </MyButton>
      </div>

      <MyTable<ColumnType> dataSource={data} rowKey={record => record.key} height="100%">
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Gender" dataIndex="gender" key="gender" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column<ColumnType>
          title="Role"
          dataIndex="role"
          key="role"
          render={(role: string) => (
            <Tag color="blue" key={role}>
              {role}
            </Tag>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record: ColumnType) => (
            <Space size="middle">
              <Dropdown overlay={menu(record)} trigger={['click']}>
                <MyButton type="text">
                  Actions <DownOutlined />
                </MyButton>
              </Dropdown>
            </Space>
          )}
        />
      </MyTable>

      {/* Modal for Add, Update, and View */}
      <Modal
        title={viewMode ? "View Record" : isEditMode ? "Update Record" : "Add Record"}
        visible={isModalVisible}
        onOk={viewMode ? handleCancel : handleOk}
        onCancel={handleCancel}
        okText={viewMode ? "Close" : "OK"}
        cancelButtonProps={{ style: { display: viewMode ? 'none' : 'inline' } }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please enter the first name' }]}
          >
            <Input disabled={viewMode} />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please enter the last name' }]}
          >
            <Input disabled={viewMode} />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please select the gender' }]}
          >
            <Select disabled={viewMode}>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please enter the address' }]}
          >
            <Input disabled={viewMode} />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please enter the role' }]}
          >
            <Input disabled={viewMode} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GuidePage;

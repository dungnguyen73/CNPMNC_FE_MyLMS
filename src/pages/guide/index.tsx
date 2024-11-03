import type { FC } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Space, Tag, Dropdown, Menu, Modal, Form, Input, Select, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import MyButton from '@/components/basic/button';
import MyTable from '@/components/core/table';

const { Column } = MyTable;
const { Option } = Select;

interface User {
  id: string;
  fullname: string;
  gender: string;
  address: string;
  role: string;
}

const GuidePage: FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [form] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState<User | null>(null);

  const apiUrl = 'https://75fbcf2e-9578-42e9-972f-80007010adfe.mock.pstmn.io/api/v1/user';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data.data);  // Assuming the API returns data in `data`
    } catch (error) {
      message.error("Error fetching data");
    }
  };

  const addData = async (newRecord: User) => {
    try {
      const response = await axios.post(apiUrl, newRecord);
      setData(prevData => [...prevData, response.data.data]);  // Assuming the new record is in response
      message.success("Record added successfully");
    } catch (error) {
      message.error("Error adding record");
    }
  };

  const updateData = async (updatedRecord: User) => {
    try {
      await axios.put(`${apiUrl}/${updatedRecord.id}`, updatedRecord);
      setData(prevData =>
        prevData.map(record => (record.id === updatedRecord.id ? updatedRecord : record))
      );
      message.success("Record updated successfully");
    } catch (error) {
      message.error("Error updating record");
    }
  };

  const deleteData = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setData(prevData => prevData.filter(record => record.id !== id));
      message.success("Record deleted successfully");
    } catch (error) {
      message.error("Error deleting record");
    }
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setViewMode(false);
    setCurrentRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleUpdate = (record: User) => {
    setIsEditMode(true);
    setViewMode(false);
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleView = (record: User) => {
    setIsEditMode(false);
    setViewMode(true);
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    deleteData(id);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const recordToSubmit = {
        ...values,
        id: isEditMode && currentRecord ? currentRecord.id : `${Date.now()}`,
      };

      // Log the values to ensure role is captured correctly
      console.log("Form Values on Submit:", values);

      if (isEditMode && currentRecord) {
        updateData(recordToSubmit);
      } else {
        addData(recordToSubmit);
      }
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const menu = (record: User) => (
    <Menu>
      <Menu.Item key="view" onClick={() => handleView(record)}>View</Menu.Item>
      <Menu.Item key="update" onClick={() => handleUpdate(record)}>Update</Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDelete(record.id)}>Delete</Menu.Item>
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

      <MyTable<User> dataSource={data} rowKey={record => record.id} height="100%">
        <Column title="Full Name" dataIndex="fullname" key="fullname" />
        <Column title="Gender" dataIndex="gender" key="gender" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column<User>
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
          render={(text, record: User) => (
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
            label="Full Name"
            name="fullname"
            rules={[{ required: true, message: 'Please enter the full name' }]}
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
            rules={[{ required: true, message: 'Please select the role' }]}
          >
            <Select disabled={viewMode} placeholder="Select a role">
              <Option value="Student">Student</Option>
              <Option value="Teacher">Teacher</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GuidePage;

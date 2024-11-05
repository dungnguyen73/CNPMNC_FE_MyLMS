import { FC, useEffect, useState } from 'react';
import { Button, Dropdown, Menu, Modal, Space, Table, Typography, Input, Form, Select, DatePicker, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import MyButton from '@/components/basic/button';
import axios from 'axios';

const { Option } = Select;
const { Title } = Typography;

export enum ActionType {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  CREATE = 'CREATE'
}

const DocumentationPage: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionType>(ActionType.VIEW);
  const [form] = Form.useForm();
  const [data, setData] = useState<any[]>([]);
  const [currentRecord, setCurrentRecord] = useState<any>(null);

  const apiUrl = 'https://75fbcf2e-9578-42e9-972f-80007010adfe.mock.pstmn.io/api/v1/tests';  

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      message.error("Failed to load data.");
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (type: ActionType, record?: any) => {
    setIsOpen(true);
    setActionType(type);
    setCurrentRecord(record || null);
    if (type === ActionType.CREATE) {
      form.resetFields();
    } else if (record) {
      form.setFieldsValue(record);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setCurrentRecord(null);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (actionType === ActionType.CREATE) {
        await axios.post(apiUrl, values);
        message.success("Test created successfully.");
      } else if (actionType === ActionType.EDIT && currentRecord) {
        await axios.put(`${apiUrl}/${currentRecord.key}`, values);
        message.success("Test updated successfully.");
      }
      fetchData(); // Refresh data after submit
      handleCloseModal();
    } catch (error) {
      message.error("Failed to save data.");
      console.error('Error saving data:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      message.success("Test deleted successfully.");
      fetchData(); // Refresh data after deletion
    } catch (error) {
      message.error("Failed to delete data.");
      console.error('Error deleting data:', error);
    }
  };

  const menu = (record: any) => (
    <Menu>
      <Menu.Item key="view" onClick={() => handleOpenModal(ActionType.VIEW, record)}>
        View
      </Menu.Item>
      <Menu.Item key="update" onClick={() => handleOpenModal(ActionType.EDIT, record)}>
        Update
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDelete(record.key)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const testColumn = [
    { title: 'Test Name', dataIndex: 'test_name' },
    { title: 'Test Type', dataIndex: 'type' },
    { title: 'Created Date', dataIndex: 'created_date' },
    { title: 'Number of Questions', dataIndex: 'num_of_question' },
    { title: 'Duration', dataIndex: 'duration' },
    { title: 'Test Key', dataIndex: 'test_key' },
    {
      title: 'Action',
      dataIndex: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Dropdown overlay={menu(record)} trigger={['click']}>
            <MyButton type="text">
              Actions <DownOutlined />
            </MyButton>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const viewMode = actionType === ActionType.VIEW;

  return (
    <>
      <div style={{ flex: 'none' }}>
        <Title>Test Management</Title>
        <Button onClick={() => handleOpenModal(ActionType.CREATE)}>Create Test</Button>
      </div>
      <Table columns={testColumn} dataSource={data} rowKey="key" />
      <Modal
        open={isOpen}
        destroyOnClose
        onCancel={handleCloseModal}
        onOk={handleSubmit}
        title={actionType === ActionType.VIEW ? 'View Test' : actionType === ActionType.EDIT ? 'Edit Test' : 'Create Test'}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Test Name" name="test_name" rules={[{ required: true, message: 'Please enter the test name' }]}>
            <Input disabled={viewMode} />
          </Form.Item>
          <Form.Item label="Test Type" name="type" rules={[{ required: true, message: 'Please select the test type' }]}>
            <Select disabled={viewMode} placeholder="Select test type">
              <Option value="Type 1">Type 1</Option>
              <Option value="Type 2">Type 2</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Created Date" name="created_date" rules={[{ required: true, message: 'Please select the created date' }]}>
            <DatePicker disabled={viewMode} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Number of Questions" name="num_of_question" rules={[{ required: true, message: 'Please enter the number of questions' }]}>
            <Input type="number" disabled={viewMode} />
          </Form.Item>
          <Form.Item label="Duration" name="duration" rules={[{ required: true, message: 'Please enter the duration' }]}>
            <Input disabled={viewMode} />
          </Form.Item>
          <Form.Item label="Test Key" name="test_key" rules={[{ required: true, message: 'Please enter the test key' }]}>
            <Input disabled={viewMode} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DocumentationPage;

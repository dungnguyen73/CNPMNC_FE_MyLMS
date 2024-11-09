import { FC, useEffect, useState } from 'react';
import { Button, Dropdown, Menu, Modal, Space, Table, Typography, Input, Form, Select, DatePicker, message, Row, Col, List } from 'antd';
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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(!accessToken);
  const [actionType, setActionType] = useState<ActionType>(ActionType.VIEW);
  const [form] = Form.useForm();
  const [data, setData] = useState<any[]>([]);
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);
  const [availableQuestions, setAvailableQuestions] = useState<any[]>([
    { id: 'q1', name: 'Question 1' },
    { id: 'q2', name: 'Question 2' },
    // Additional questions can be fetched or added here
  ]);

  const apiUrl = 'https://hoaqdzink.onrender.com/api/v1/tests';
  const loginUrl = 'https://hoaqdzink.onrender.com/api/v1/login';
  

  const fetchData = async () => {
    if (!accessToken) return; // Prevent data loading if no access token is available
    try {
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
  
      if (response.status === 200 && response.data.success) {
        setData(response.data.data);
      } else {
        message.error("Failed to load data.");
      }
    } catch (error) {
      message.error("Failed to load data.");
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  
  
  const handleOpenModal = (type: ActionType, record?: any) => {
    setIsOpen(true);
    setActionType(type);
    setCurrentRecord(record || null);
    setSelectedQuestions(record?.questions || []);
    if (type === ActionType.CREATE) {
      form.resetFields();
    } else if (record) {
      form.setFieldsValue(record);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setCurrentRecord(null);
    setSelectedQuestions([]);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      values.questions = selectedQuestions;
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };

      if (actionType === ActionType.CREATE) {
        await axios.post(apiUrl, values, config);
        message.success("Test created successfully.");
      } else if (actionType === ActionType.EDIT && currentRecord) {
        await axios.put(`${apiUrl}/${currentRecord.id}`, values, config);
        message.success("Test updated successfully.");
      }
      fetchData();
      handleCloseModal();
    } catch (error) {
      message.error("Failed to save data.");
      console.error('Error saving data:', error);
    }
  };

  const handleAddQuestion = (questionId: string) => {
    const question = availableQuestions.find(q => q.id === questionId);
    if (question && !selectedQuestions.some(q => q.id === questionId)) {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      message.success("Test deleted successfully.");
      fetchData();
    } catch (error) {
      message.error("Failed to delete data.");
      console.error('Error deleting data:', error);
    }
  };

  const handleDeleteQuestion = (questionId: string) => {
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== questionId));
  };

  const menu = (record: any) => (
    <Menu>
      <Menu.Item key="view" onClick={() => handleOpenModal(ActionType.VIEW, record)}>
        View
      </Menu.Item>
      <Menu.Item key="update" onClick={() => handleOpenModal(ActionType.EDIT, record)}>
        Update
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDelete(record.id)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const testColumn = [
    { title: 'Test Name', dataIndex: 'title', key: 'title' },
    { title: 'Test Type', dataIndex: 'description', key: 'description' },
    { title: 'Created By', dataIndex: ['creator', 'fullname'], key: 'creatorName' },
    { title: 'Role', dataIndex: ['creator', 'role'], key: 'creatorRole' },
    { title: 'Duration', dataIndex: 'duration', key: 'duration', render: (duration: number) => `${duration} minutes` },
    { title: 'Test Key', dataIndex: 'passcode', key: 'passcode' },
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
      <Table columns={testColumn} dataSource={data} rowKey="id" />
      <Modal
        open={isOpen}
        destroyOnClose
        onCancel={handleCloseModal}
        onOk={handleSubmit}
        title={actionType === ActionType.VIEW ? 'View Test' : actionType === ActionType.EDIT ? 'Edit Test' : 'Create Test'}
        width="80vw"
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Test Name" name="title" rules={[{ required: true, message: 'Please enter the test name' }]}>
                <Input disabled={viewMode} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Test Type" name="description" rules={[{ required: true, message: 'Please enter the description' }]}>
                <Input disabled={viewMode} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Duration" name="duration" rules={[{ required: true, message: 'Please enter the duration' }]}>
                <Input type="number" disabled={viewMode} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Test Key" name="passcode" rules={[{ required: true, message: 'Please enter the passcode' }]}>
                <Input disabled={viewMode} />
              </Form.Item>
            </Col>
            {!viewMode && (
              <Col span={24} style={{marginBottom: '30px'}}>
                <Select style={{ width: '100%' }} onChange={handleAddQuestion} placeholder="Add a question">
                  {availableQuestions.map((question) => (
                    <Option key={question.id} value={question.id}>{question.name}</Option>
                  ))}
                </Select>
              </Col>
            )}
            <Col span={24}>
              <List
                size="small"
                header={<div>Selected Questions</div>}
                bordered
                dataSource={selectedQuestions}
                renderItem={(item) => (
                  <List.Item actions={!viewMode ? [<Button danger onClick={() => handleDeleteQuestion(item.id)}>Remove</Button>] : []}>
                    {item.name}
                  </List.Item>
                )}
              />
            </Col>
          
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default DocumentationPage;

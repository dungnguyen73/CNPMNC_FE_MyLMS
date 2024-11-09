import { FC, useEffect, useState } from 'react';
import { Button, Dropdown, Menu, Modal, Space, Table, Typography, Input, Form, Select, Row, Col, List, message } from 'antd';
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
  const [questions, setQuestions] = useState<any[]>([]);  // For storing the list of questions from the test.
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);
  const [availableQuestions, setAvailableQuestions] = useState<any[]>([
    { id: 'q1', name: 'Question 1' },
    { id: 'q2', name: 'Question 2' },
    // Additional questions can be fetched or added here
  ]);

  const getToken = () => {
    return localStorage.getItem('token');
  };
  
  const setToken = (token: string) => {
    localStorage.setItem('token', token);
  };
  const API_QUESTION_URL = 'https://hoaqdzink.onrender.com/api/v1';

  const clearToken = () => {
    localStorage.removeItem('token');
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_QUESTION_URL}/login`, {
        username: username,
        password: password,
      });
  
      const token = response.data.data.accessToken;
  
      setToken(token);
  
      return token;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

const authenticate = async (username?: string, password?: string) => {
    let token = getToken();
    if (!token && username && password) {
      token = await login(username, password);
    }
  
    return token;
  };
  

  const apiUrl = 'https://hoaqdzink.onrender.com/api/v1/tests';
  const loginUrl = 'https://hoaqdzink.onrender.com/api/v1/login';

  // Fetch test data
  const fetchData = async () => {
    try {
      const token = await authenticate('vvkha', 'Test123456');
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` }
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

  const fetchQuestionList = async () => {
    try {
      const token = await authenticate('vvkha', 'Test123456');
      const response = await axios.get(`https://hoaqdzink.onrender.com/api/v1/questions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.status === 200 && response.data.success) {
        setAvailableQuestions(response.data.data);
      } else {
        message.error("Failed to load data.");
      }
    } catch (error) {
      message.error("Failed to load data.");
      console.error('Error fetching data:', error);
    }
  };

  // Fetch questions by testId
  const fetchQuestionsByTestId = async (testId: number) => {
    try {
      const token = await authenticate('vvkha', 'Test123456');
      const response = await axios.get(`https://hoaqdzink.onrender.com/api/v1/question/test/${testId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.status === 200 && response.data.success) {
        console.log(response.data.data);
        setSelectedQuestions(response.data.data); // set these questions as selected for the modal
      } else {
        message.error("Failed to load questions.");
      }
    } catch (error) {
      message.error("Failed to load questions.");
      console.error('Error fetching questions:', error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  const handleOpenModal = async (type: ActionType, record?: any) => {
    setIsOpen(true);
    setActionType(type);
    setCurrentRecord(record || null);
    setSelectedQuestions([]); // Reset selected questions
    
    await fetchQuestionList(); // fetch available questions
    
    if (type === ActionType.CREATE) {
      form.resetFields();
    } else if (record) {
      await fetchQuestionsByTestId(record.id); // fetch questions specific to this test
      form.setFieldsValue(record); // populate form with existing test data
    }
  };
  const handleCloseModal = () => {
    setIsOpen(false);
    setCurrentRecord(null);
    setSelectedQuestions([]);
    setQuestions([]);
  };

  const handleSubmit = async () => {
    try {
      const token = await authenticate('vvkha', 'Test123456');
      const values = await form.validateFields();
      values.creatorId ="TE314702"
      values.startTime="2024-11-09T04:35:41.861Z"
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (actionType === ActionType.CREATE) {
        await axios.post(apiUrl, values, config);
       
        message.success("Test created successfully.");
      } else if (actionType === ActionType.EDIT && currentRecord) {
        await axios.put(`${apiUrl}/${currentRecord.id}`, values, config);
        for(let i = 0; i < selectedQuestions.length; i++) {
          await axios.post('https://hoaqdzink.onrender.com/api/v1/question/test', {"questionId": selectedQuestions[i].id,
            "testId": currentRecord.id 
          },config);
        }
        console.log(currentRecord.id);
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
      const token = await authenticate('vvkha', 'Test123456');

      await axios.delete(`${apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token }` }
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
      <Table
        columns={testColumn}
        dataSource={data}
        rowKey="id"
        pagination={{
          pageSize: 10,  // You can set this to the number of rows per page
        }}
        scroll={{ x: 'max-content' }}  // Enables horizontal scrolling when content overflows
      />
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
          </Row>
          <Title level={5}>Questions</Title>
          <List
            size="small"
            bordered
            dataSource={selectedQuestions}
            renderItem={item => (
              <List.Item
                actions={[<Button onClick={() => handleDeleteQuestion(item.id)} danger>Delete</Button>]}
              >
              {item.questionText ? item.questionText : item.questionContent}
              </List.Item>
            )}
          />
          <Select
            placeholder="Add questions"
            onChange={handleAddQuestion}
            style={{ width: '100%' }}
            disabled={viewMode}
          >
            {
                availableQuestions.map(q => { return (
              <Option key={q.id} value={q.id}>{ q.questionText !=null ? q.questionText:q.questionContent}</Option>
            )})}
          </Select>
        </Form>
      </Modal>
    </>
  );
};

export default DocumentationPage;

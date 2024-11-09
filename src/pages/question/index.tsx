import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { Space, Tag, message , Menu, Dropdown, Form} from 'antd';
import { fetchRecords, createRecord, updateRecord, deleteRecord } from '../../api/question';
import MyButton from '@/components/basic/button';
import MyTable from '@/components/core/table';
import { Question } from '../../interface/question';
import { DownOutlined } from '@ant-design/icons';
import QuestionForm from './QuestionFormModal';
import loadingGif from '../../assets/header/loading.gif';
import './index.less';

const { Column, ColumnGroup } = MyTable;

const TablePage: FC = () => {
  const [data, setData] = useState<Question[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState<Question | null>(null);

  const handleAdd = () => {
    setShowForm(true);
    setIsEditMode(false);
    setViewMode(false);
    setCurrentRecord(null);
    form.resetFields();
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const onEdit = (record: Question) => {
    setIsEditMode(true);
    setViewMode(false);
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setShowForm(true);
  };

  const onView = (record: Question) => {
    setViewMode(true);
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setShowForm(true);
  };

  const onDelete = async (record: Question) => {
    setLoading(true);

    if (record?.id) {
      await deleteRecord(record.id);
      setReload(reload + 1);
      message.success("Question deleted successfully");
    }
  };

  const handleFormSubmit = async (formData: any) => {
    console.log('Form data submitted:', formData);

    const A: Question = {

      id: currentRecord?.id || 0,

      questionText: formData.questionText,
      questionType: formData.questionType,
      choiceA: formData.choiceA,
      choiceB: formData.choiceB,
      choiceC: formData.choiceC,
      choiceD: formData.choiceD,
      correctAnswer: formData.correctAnswer,
      score: formData.score,
    };

    setLoading(true);
    handleCloseForm();
    message.success(isEditMode ? 'Question updated successfully' : 'Question added successfully');

    if (isEditMode && currentRecord?.id) {
      await updateRecord(currentRecord.id, A);
    } else {
      await createRecord(A);
    }
    setReload(reload + 1);
  };

  useEffect(() => {
    setLoading(true);
    loadRecords();
  }, [reload]);

  const loadRecords = async () => {
    try {
      const records = await fetchRecords();

      setData(records);
      setLoading(false);
    } catch (error) {
      message.error('Failed to load records');
    }
  };

  const menu = (record: Question) => (
    <Menu>
      <Menu.Item key="view" onClick={() => onView(record)}>View</Menu.Item>
      <Menu.Item key="edit" onClick={() => onEdit(record)}>Edit</Menu.Item>
      <Menu.Item key="delete" onClick={() => onDelete(record)}>Delete</Menu.Item>
    </Menu>
  );


  return (
    <div className="aaa">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <MyButton type="primary" onClick={handleAdd}> Create New Question </MyButton>
      </div>

      <MyTable<Question> dataSource={data} rowKey={record => `${record.id}`}>
        <Column title="Question Id" dataIndex="id" key="id" width="8%" />
        <Column title="Question Text" dataIndex="questionText" key="questionText" />
        <Column title="Question Type" dataIndex="questionType" key="questionType" width="8%" />
        <ColumnGroup title="Choice">
          <Column title="Choice A" dataIndex="choiceA" key="choiceA" />
          <Column title="Choice B" dataIndex="choiceB" key="choiceB" />
          <Column title="Choice C" dataIndex="choiceC" key="choiceC" />
          <Column title="Choice D" dataIndex="choiceD" key="choiceD" />
        </ColumnGroup>
        <Column title="Correct Answer" dataIndex="correctAnswer" key="correctAnswer" width="8%" />
        <Column title="Score" dataIndex="score" key="score" width="8%" />
        <Column
          title="Action"
          key="action"
          width={150}
          render={(_, record: Question) => (
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
      <div>
        <QuestionForm
          visible={showForm}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseForm}
          form={form}
          viewMode={viewMode}
        />
      </div>
      {loading && (
        <div className="loading-overlay">
          <img src={loadingGif} alt="Loading..." className="loading-gif" />
        </div>
      )
      }
    </div>
  );
};

export default TablePage;

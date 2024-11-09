import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { Space, Tag, message , Menu, Dropdown, Form, Result} from 'antd';
import { fetchTestResult, fetchStudentResult } from '../../api/result';
import MyButton from '@/components/basic/button';
import MyTable from '@/components/core/table';
import { TestResult }  from '../../interface/result';
import { StudentResult }  from '../../interface/studentResult';
import MySearch from '@/components/business/search';
import MyFormItem from '@/components/core/form-item';
import { DownOutlined } from '@ant-design/icons';
// import QuestionForm from './QuestionFormModal';
import loadingGif from '../../assets/header/loading.gif';

const { Column, ColumnGroup } = MyTable;

interface SearchValues {
  testId: number;
}
interface SearchValues2 {
  userId: number;
}

const TablePage: FC = () => {
  const [data, setData] = useState<TestResult[]>([]);
  const [isTestSearch, setIsTestSearch] = useState(true);


  const onSearchTest = async (value: SearchValues) => {
    try {
      setIsTestSearch(true);
      const { testId } = value;
      const records = await fetchTestResult(testId);

      console.log(records);
      setData(records);
      // setLoading(false);
    } catch (error) {
      message.error('Failed to load records');
    }
  };

  const onSearchStudent = async (value: SearchValues2) => {
    try {
      setIsTestSearch(false);
      const { userId } = value;
      const records = await fetchStudentResult(userId);

      console.log(records);
      setData(records);
      // setLoading(false);
    } catch (error) {
      message.error('Failed to load records');
    }
  };

  return (
    <div className="aaa">
      <MySearch onSearch={onSearchTest}>
        <MyFormItem label="Enter Test ID To Search" type="input" name="testId" />
      </MySearch>
      <MySearch onSearch={onSearchStudent}>
        <MyFormItem label="Enter Student ID To Search" type="input" name="userId" />
      </MySearch>
      {isTestSearch && (
        <div>
          <MyTable<TestResult> dataSource={data} rowKey={record => `${record.userId}`}>
            <Column title="Test's Title" dataIndex="testTitle" key="testTitle" width="8%" />
            <Column title="Test Duration" dataIndex="testDuration" key="testDuration" width="8%" />
            <Column title="User Id" dataIndex="userId" key="userId" width="8%" />
            <Column title="User's Name" dataIndex="username" key="username" />
            <Column title="Student's Name" dataIndex="fullname" key="fullname" width="8%" />
            <Column title="Started Time" dataIndex="testStartTime" key="testStartTime" width="8%" />
            <Column title="Score" dataIndex="score" key="score" width="8%" />
          </MyTable>
        </div>
      )}
      {!isTestSearch && (
        <div>
        <MyTable<TestResult> dataSource={data} rowKey={record => `${record.userId}`}>
          <Column title="User Id" dataIndex="userId" key="userId" width="8%" />
          <Column title="User's Name" dataIndex="username" key="username" />
          <Column title="Student's Name" dataIndex="fullname" key="fullname" width="8%" />
          <Column title="Test's Title" dataIndex="testTitle" key="testTitle" width="8%" />
          <Column title="Started Time" dataIndex="testStartTime" key="testStartTime" width="8%" />
          <Column title="Test Duration" dataIndex="testDuration" key="testDuration" width="8%" />
          <Column title="Score" dataIndex="score" key="score" width="8%" />
        </MyTable>
      </div>
      )

      }
    </div>
  );
};

export default TablePage;

import { FC } from 'react';
import { Table, Space, Button } from 'antd';
import { TestResult } from '../../interface/testforstu';

interface TestTableProps {
  data: TestResult[];
  onTakeTest: (record: TestResult) => void;
}

const TestTable: FC<TestTableProps> = ({ data, onTakeTest }) => {
  console.log('TestTable data:', data); // Log the data passed to TestTable
  const isTestActive = (testStartTime: string, testDuration: number, Score: number) => {
    const startTime = new Date(testStartTime).getTime();
    const endTime = startTime + testDuration * 3600000; // Convert duration from minutes to milliseconds
    const currentTime = Date.now();
    
    return currentTime >= startTime && currentTime <= endTime && Score === -1;
  };
  return (
    <Table dataSource={data} rowKey="testId" scroll={{ x: '100%' }}>
      <Table.Column title="Test Title" dataIndex="testTitle" key="testTitle" width={200} />
      <Table.Column title="Score" dataIndex="score" key="score" width={100} />
      <Table.Column
      title="Start Time"
      dataIndex="testStartTime"
      key="testStartTime"
      width={200}
      render={(text: string) => new Date(text).toLocaleString()}
      />
      <Table.Column title="Duration" dataIndex="testDuration" key="testDuration" width={100} />
      <Table.Column
      title="Action"
      key="action"
      width={150}
      render={(_, record: TestResult) => (
        <Space size="middle">
        <Button type="primary" onClick={() => onTakeTest(record)} disabled={!isTestActive(record.testStartTime, record.testDuration,record.score)}>
          Take Test
        </Button>
        </Space>
      )}
      />
    </Table>
  );
};

export default TestTable;
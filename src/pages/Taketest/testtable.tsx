import { FC } from 'react';
import { Table, Space, Button } from 'antd';
import { Test } from '../../interface/test';

interface TestTableProps {
  data: Test[];
  onTakeTest: (record: Test) => void;
}

const TestTable: FC<TestTableProps> = ({ data, onTakeTest }) => {
  return (
    <Table dataSource={data} rowKey="id" scroll={{ x: '100%' }}>
      <Table.Column title="Test Name" dataIndex="title" key="title" width={200} />
      <Table.Column title="Description" dataIndex="description" key="description" width={250} />
      <Table.Column 
        title="Creator" 
        dataIndex={['creator', 'fullname']} 
        key="creator" 
        width={200} 
      />
      <Table.Column title="Start Time" dataIndex="startTime" key="startTime" width={200} />
      <Table.Column title="Duration" dataIndex="duration" key="duration" width={100} />
      <Table.Column
        title="Action"
        key="action"
        width={150}
        render={(_, record: Test) => (
          <Space size="middle">
            <Button type="primary" onClick={() => onTakeTest(record)}>
              Take Test
            </Button>
          </Space>
        )}
      />
    </Table>
  );
};

export default TestTable;
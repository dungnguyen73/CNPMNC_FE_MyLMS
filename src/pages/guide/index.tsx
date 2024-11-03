import type { FC } from 'react';
import 'driver.js/dist/driver.min.css';
import { Space, Tag, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import MyButton from '@/components/basic/button';
import MyTable from '@/components/core/table';

const { Column, ColumnGroup } = MyTable;

interface ColumnType {
  key: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}

const data: ColumnType[] = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

// Extend the data array
new Array(30).fill(undefined).forEach((_, index) => {
  data.push({
    key: index + 4 + '',
    firstName: 'Joe' + index,
    lastName: 'Black' + index,
    age: 32 + index,
    address: 'Sidney No. 1 Lake Park' + index,
    tags: ['cool', 'teacher'],
  });
});

const GuidePage: FC = () => {
  // Define the CRUD menu
  const menu = (
    <Menu>
      <Menu.Item key="view">View</Menu.Item>
      <Menu.Item key="update">Update</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  return (
    <div className="aaa">
      <MyTable<ColumnType> dataSource={data} rowKey={record => record.key} height="100%">
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column<ColumnType>
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags: string[]) => (
            <>
              {tags.map(tag => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record: ColumnType) => (
            <Space size="middle">
              <Dropdown overlay={menu} trigger={['click']}>
                <MyButton type="text">
                  Actions <DownOutlined />
                </MyButton>
              </Dropdown>
            </Space>
          )}
        />
      </MyTable>
    </div>
  );
};

export default GuidePage;

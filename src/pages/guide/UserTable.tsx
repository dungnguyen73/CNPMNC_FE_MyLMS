import { FC } from 'react';
import { Table, Space, Dropdown, Menu, Tag } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { User } from '../../types/user';
import MyButton from '@/components/basic/button';

interface UserTableProps {
  data: User[];
  onView: (record: User) => void;
  onEdit: (record: User) => void;
  onDelete: (id: string) => void;
}

const UserTable: FC<UserTableProps> = ({ data, onView, onEdit, onDelete }) => {
  const menu = (record: User) => (
    <Menu>
      <Menu.Item key="view" onClick={() => onView(record)}>View</Menu.Item>
      <Menu.Item key="edit" onClick={() => onEdit(record)}>Edit</Menu.Item>
      <Menu.Item key="delete" onClick={() => onDelete(record.id)}>Delete</Menu.Item>
    </Menu>
  );

  return (
    <Table dataSource={data} rowKey="id" scroll={{ x: '100%' }}>
      <Table.Column title="Full Name" dataIndex="fullname" key="fullname" width={200} />
      <Table.Column title="Gender" dataIndex="gender" key="gender" width={100} />
      <Table.Column title="Address" dataIndex="address" key="address" width={250} />
      <Table.Column
        title="Role"
        dataIndex="role"
        key="role"
        width={150}
        render={(role: string) => <Tag color="blue">{role}</Tag>}
      />
      <Table.Column
        title="Action"
        key="action"
        width={150}
        render={(_, record: User) => (
          <Space size="middle">
            <Dropdown overlay={menu(record)} trigger={['click']}>
              <MyButton type="text">
                Actions <DownOutlined />
              </MyButton>
            </Dropdown>
          </Space>
        )}
      />
    </Table>
  );
};

export default UserTable;

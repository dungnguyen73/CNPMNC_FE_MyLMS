import { FC, useState } from 'react';

import { Button, Dropdown, Menu, Modal, Space, Table, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LocaleFormatter } from '@/locales';
import MyButton from '@/components/basic/button';
import menu from 'antd/es/menu';
import Title from 'antd/es/typography/Title';
import useModal from 'antd/es/modal/useModal';
import { ColumnsType } from 'antd/es/table/Table';

const { Paragraph } = Typography;
export enum ActionType {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  // DELETE = 'DELETE',
  CREATE ='CREATE'
}

const DocumentationPage: FC = () => {
  const [isOpen, setisOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setisOpen(true);
  }
  const handleCloseModal = () => {
    setisOpen(false);
  }

  const [actionType, setActionType] = useState<ActionType>(ActionType.VIEW) 

  const menu = (record: any) => (
    <Menu>
      <Menu.Item key="view" onClick={() => {
        handleOpenModal();
        setActionType(ActionType.VIEW)
      }}>
        View
      </Menu.Item>
      <Menu.Item key="update" onClick={() => {
        handleOpenModal();
        setActionType(ActionType.EDIT)
      }}>
        Update
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => {
        //handle Delete
      }}>
        Delete
      </Menu.Item>
    </Menu>
  );
  const testColumn: ColumnsType<any> = [
    {
      title: 'Test Name',
      dataIndex: 'test_name',
      render: (val: any) => val,
    },
    {
      title: 'Test Type',
      dataIndex: 'type',
      render: (val: any) => val,
    },
    {
      title: 'Created Date',
      dataIndex: 'created_date',
      render: (val: any) => val,
    },
    {
      title: 'Number of Question',
      dataIndex: 'num_of_question',
      render: (val: any) => val,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      render: (val: any) => val,
    },
    {
      title: 'Test Key',
      dataIndex: 'test_key',
      render: (val: any) => val,
    },
    {
      title: 'Action',
    dataIndex: 'actions',
    render: (_: any, record: any) => {
      return (
        <Space size="middle">
          <Dropdown overlay={menu(record)} trigger={['click']}>
            <MyButton type="text">
              Actions <DownOutlined />
            </MyButton>
          </Dropdown>
        </Space>
        )
      },
    },
  ];

  const dataSrc: any[] = [];

  return (
    <>
    <div >
    <Title>Test Management</Title>
    <Button onClick={handleOpenModal}>Create Test</Button>
    </div>
      <Table columns={testColumn} dataSource={dataSrc} />
      <Modal open={isOpen} destroyOnClose onCancel={handleCloseModal} onOk={handleCloseModal}>
        <div>
          <Title>Pop up {actionType}</Title>
        </div>
      </Modal>
    </>
  );
};

export default DocumentationPage;

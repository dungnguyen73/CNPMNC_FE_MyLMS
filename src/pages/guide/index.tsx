import { FC, useState, useEffect } from 'react';
import { message, Form } from 'antd';
import UserTable from './UserTable';
import UserFormModal from './UserFormModal';
import { fetchUsers, addUser, updateUser, deleteUser } from '../../api/account.api';
import { User } from '../../types/user';
import MyButton from '@/components/basic/button';

const GuidePage: FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [form] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState<User | null>(null);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const users = await fetchUsers();
      setData(users);
    } catch {
      message.error("Error fetching data");
    }
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setViewMode(false);
    setCurrentRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: User) => {
    setIsEditMode(true);
    setViewMode(false);
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleView = (record: User) => {
    setViewMode(true);
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setData(data.filter(record => record.id !== id));
      message.success("Record deleted successfully");
    } catch {
      message.error("Error deleting record");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const userToSave = { ...values, id: isEditMode && currentRecord ? currentRecord.id : `${Date.now()}` };

      if (isEditMode && currentRecord) {
        await updateUser(userToSave);
        setData(data.map(record => (record.id === currentRecord.id ? userToSave : record)));
      } else {
        const newUser = await addUser(userToSave);
        setData([...data, newUser]);
      }

      message.success(isEditMode ? "Record updated successfully" : "Record added successfully");
      setIsModalVisible(false);
    } catch {
      message.error("Error saving data");
    }
  };

  return (
    <div className="user-manage">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <MyButton type="primary" onClick={handleAdd}>Add</MyButton>
      </div>
      <UserTable data={data} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
      <UserFormModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleOk}
        form={form}
        viewMode={viewMode}
      />
    </div>
  );
};

export default GuidePage;

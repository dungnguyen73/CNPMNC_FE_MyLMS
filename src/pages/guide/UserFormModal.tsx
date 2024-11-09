import { FC } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { User } from '../../types/user';

const { Option } = Select;

interface UserFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (data: Omit<User, 'id'>) => void; 
  form: any;
  viewMode: boolean;
}

const UserFormModal: FC<UserFormModalProps> = ({ visible, onCancel, onOk, form, viewMode }) => {
  const handleOk = async () => {
    try {
      const values = await form.validateFields(); 
      if (!viewMode) {
        const { id, ...dataWithoutId } = values; 
        onOk(dataWithoutId); 
      } else {
        onCancel();
      }
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };
  

  return (
    <Modal
      title={viewMode ? "View Record" : "Add or Update Record"}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText={viewMode ? "Close" : "OK"}
      cancelButtonProps={{ style: { display: viewMode ? 'none' : 'inline' } }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[{ required: true, message: 'Please enter the full name' }]}
        >
          <Input disabled={viewMode} />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter the username' }]}
        >
          <Input disabled={viewMode} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input the password!' }]}
        >
          <Input.Password disabled={viewMode} />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select gender!' }]}
        >
          <Select disabled={viewMode}>
            <Option value={true}>Nam</Option>
            <Option value={false}>Nữ</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please enter the address' }]}
        >
          <Input disabled={viewMode} />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please enter the phone' }]}
        >
          <Input disabled={viewMode} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter the email' }]}
        >
          <Input disabled={viewMode} />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please select the role' }]}
        >
          <Select disabled={viewMode} placeholder="Select a role">
            <Option value="STUDENT">Student</Option>
            <Option value="TEACHER">Teacher</Option>
            <Option value="ADMIN">Admin</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserFormModal;

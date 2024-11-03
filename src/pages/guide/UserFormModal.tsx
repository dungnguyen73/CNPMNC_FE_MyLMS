import { FC } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { User } from '../../types/user';

const { Option } = Select;

interface UserFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  form: any;
  viewMode: boolean;
}

const UserFormModal: FC<UserFormModalProps> = ({ visible, onCancel, onOk, form, viewMode }) => {
  return (
    <Modal
      title={viewMode ? "View Record" : "Add or Update Record"}
      visible={visible}
      onOk={viewMode ? onCancel : onOk}
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
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select the gender' }]}
        >
          <Select disabled={viewMode}>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
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
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please select the role' }]}
        >
          <Select disabled={viewMode} placeholder="Select a role">
            <Option value="Student">Student</Option>
            <Option value="Teacher">Teacher</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserFormModal;

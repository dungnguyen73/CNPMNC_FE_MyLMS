import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';

interface QuestionFormProps {
  onSubmit: (formData: any) => void;
  visible: boolean;
  onCancel: () => void;
  form: any;
  viewMode: boolean;
  initialValues?: any;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  onSubmit,
  visible,
  onCancel,
  form,
  viewMode,
  initialValues = {},
}) => {
  // Update form values when initialValues are provided (for editing purposes)
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <Modal
      title={viewMode ? 'Question Detail' : 'Create/Update Question'}
      visible={visible}
      onOk={viewMode ? onCancel : () => form.submit()} // Submit the form when not in viewMode
      onCancel={onCancel}
      okText={viewMode ? 'Close' : 'Submit'}
      cancelButtonProps={{ style: { display: viewMode ? 'none' : 'inline' } }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          questionText: '',
          questionType: '',
          choiceA: '',
          choiceB: '',
          choiceC: '',
          choiceD: '',
          correctAnswer: '',
          score: 0,
          ...initialValues, // Spread initialValues to pre-populate fields when editing
        }}
      >
        <Form.Item
          label="Question Text:"
          name="questionText"
          rules={[{ required: true, message: 'Please enter the question text.' }]}
        >
          <Input maxLength={500} disabled={viewMode} />
        </Form.Item>

        <Form.Item
          label="Question Type:"
          name="questionType"
          rules={[{ required: true, message: 'Please select the question type.' }]}
        >
          <Input disabled={viewMode} />
        </Form.Item>

        <Form.Item label="Choice A:" name="choiceA">
          <Input maxLength={255} disabled={viewMode} />
        </Form.Item>

        <Form.Item label="Choice B:" name="choiceB">
          <Input maxLength={255} disabled={viewMode} />
        </Form.Item>

        <Form.Item label="Choice C:" name="choiceC">
          <Input maxLength={255} disabled={viewMode} />
        </Form.Item>

        <Form.Item label="Choice D:" name="choiceD">
          <Input maxLength={255} disabled={viewMode} />
        </Form.Item>

        <Form.Item
          label="Correct Answer:"
          name="correctAnswer"
          rules={[{ required: true, message: 'Please select the correct answer.' }]}
        >
          <Select placeholder="Select the correct answer" disabled={viewMode}>
            <Select.Option value="A">A</Select.Option>
            <Select.Option value="B">B</Select.Option>
            <Select.Option value="C">C</Select.Option>
            <Select.Option value="D">D</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Score:"
          name="score"
          rules={[{ required: true, message: 'Please enter the score.' }]}
        >
          <Input type="number" step="0.5" disabled={viewMode} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default QuestionForm;

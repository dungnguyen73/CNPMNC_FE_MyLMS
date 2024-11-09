import axios from 'axios';
import { Question } from '../interface/question';

const API_QUESTION_URL = 'https://75fbcf2e-9578-42e9-972f-80007010adfe.mock.pstmn.io/api/v1/';

export const fetchRecords = async () => {
  try {
    const response = await axios.get(`${API_QUESTION_URL}/questions`);

    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }
};

export const createRecord = async (newRecord: Question) => {
  try {
    const response = await axios.post(`${API_QUESTION_URL}/records`, newRecord);

    return response.data;
  } catch (error) {
    console.error('Error creating record:', error);
    throw error;
  }
};

export const updateRecord = async (id: string, record: Question) => {
  try {
    const response = await axios.put(`${API_QUESTION_URL}/records/${id}`, record);

    return response.data;
  } catch (error) {
    console.error('Error updating record:', error);
    throw error;
  }
};

export const deleteRecord = async (id: string) => {
  try {
    await axios.delete(`${API_QUESTION_URL}/records/${id}`);
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
};

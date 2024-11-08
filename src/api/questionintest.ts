import axios from 'axios';
import { Question } from '../interface/question';

const API_QUESTION_URL = 'https://75fbcf2e-9578-42e9-972f-80007010adfe.mock.pstmn.io/api/v1';

export const fetchRecords = async (testId: string): Promise<Question[]> => {
  try {
    /*const response = await axios.get(`${API_QUESTION_URL}/questions/${testId}`);*/
    const response = await axios.get(`${API_QUESTION_URL}/questions`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }
};
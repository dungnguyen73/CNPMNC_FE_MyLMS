import axios from 'axios';
import { Question } from '../interface/question';

const API_QUESTION_URL = 'https://75fbcf2e-9578-42e9-972f-80007010adfe.mock.pstmn.io/api/v1/';
const API_URL = 'https://hoaqdzink.onrender.com/api/v1';
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0bXRodWF0IiwiZXhwIjoxNzMxMjg3Njc4LCJpYXQiOjE3MzExMTQ4NzgsIlVzZXJpZCI6IlNUMjE5NDAxIiwic2NvcGUiOiJTVFVERU5UIn0.S_fB45viPjlX-1CqYC486qfmACc6Om4QufdAapFO3F4_VbvGCOnSLW8wHikCDKp1zaCMxBOaSj01U7JvmZ-mJA';

export const fetchRecords = async (testId : number): Promise<Question[]> => {
  try {
    const response = await fetch(`${API_URL}/question/test/${testId}`, {
      headers: {
      'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    console.log(data.data);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }
};



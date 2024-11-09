import axios from 'axios';
import { TestResult } from '../interface/result';

const API_QUESTION_URL = 'https://hoaqdzink.onrender.com/api/v1';

import { authenticate } from './question';

export const fetchTestResult = async (testId: number) => {
    try {
      const token = await authenticate('vinhnh', 'Test123456');
      console.log(token);
      const response = await axios.get(`${API_QUESTION_URL}/test/${testId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (error) {
      console.error('Error fetching records:', error);
      throw error;
    }
};

export const fetchStudentResult = async (userId: number) => {
    try {
      const token = await authenticate('vinhnh', 'Test123456');
      console.log(token);
      const response = await axios.get(`${API_QUESTION_URL}/student/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (error) {
      console.error('Error fetching records:', error);
      throw error;
    }
};
import axios from 'axios';
import { TestResult } from '../interface/result';

const API_QUESTION_URL = 'https://hoaqdzink.onrender.com/api/v1';

import { authenticate, getToken, getRole, clearToken } from './question';

export const fetchTestResult = async (testId: number) => {
    try {
      const role = getRole();

      if (role != 'TEACHER') {
        clearToken();
      };

      const token = await authenticate('vvkha', 'Test123456');

      console.log(token);
      const response = await axios.get(`${API_QUESTION_URL}/test/{testId}?testId=${testId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log(response.data);

      return response.data.data;
    } catch (error) {
      console.error('Error fetching records:', error);
      throw error;
    }
};

export const fetchStudentResult = async (userId: number) => {
    try {
      const role = getRole();

      if (role != 'STUDENT') {
        clearToken();
      };

      const token = await authenticate('tmthuat', 'Test123456');

      console.log(token);

      const response = await axios.get(`${API_QUESTION_URL}/student/{userId}?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching records:', error);
      throw error;
    }
};
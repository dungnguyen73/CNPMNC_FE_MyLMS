import axios from 'axios';
import { Question } from '../interface/question';

const API_QUESTION_URL = 'https://hoaqdzink.onrender.com/api/v1';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getRole = () => {
  return localStorage.getItem('role');
};

const setToken = (token: string, role: string) => {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
};

export const clearToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};

const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_QUESTION_URL}/login`, {
      username: username,
      password: password,
    });

    const token = response.data.data.accessToken;
    const role = response.data.data.userResponse.role;

    setToken(token, role);

    return token;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const authenticate = async (username?: string, password?: string) => {
  let token = getToken();

  if (!token && username && password) {
    token = await login(username, password);
  }

  return token;
};

export const fetchRecords = async () => {
  try {
    const role = getRole();

    if (role != 'TEACHER') {
      clearToken();
    };

    const token = await authenticate('vinhnh', 'Test123456');

    console.log(token);
    const response = await axios.get(`${API_QUESTION_URL}/questions`, {
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

export const createRecord = async (newRecord: Question) => {
  try {
    const token = await authenticate('vinhnh', 'Test123456');

    console.log(token);
    const response = await axios.post(`${API_QUESTION_URL}/questions`, newRecord, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error creating record:', error);
    throw error;
  }
};

export const updateRecord = async (id: number, record: Question) => {
  try {
    const token = await authenticate('vinhnh', 'Test123456');
    const response = await axios.put(`${API_QUESTION_URL}/questions/${id}`, record, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating record:', error);
    throw error;
  }
};

export const deleteRecord = async (id: number) => {
  try {
    const token = await authenticate('vinhnh', 'Test123456');

    const response = await axios.delete(`${API_QUESTION_URL}/questions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
};

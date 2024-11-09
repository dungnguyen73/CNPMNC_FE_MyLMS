import axios from 'axios';
import {  Test } from '../interface/test';

const API_TEST_URL = 'https://ff414f8c-ee71-4a6b-9aa0-abda8e0c8eb0.mock.pstmn.io/tests';
export const fetchTests = async (): Promise<Test[]> => {
  const response = await axios.get(API_TEST_URL);
  return response.data.data; // Assuming the API returns data in `data`
};
export const fetchTestById = async (id: string): Promise<Test> => {
  const response = await axios.get(`${API_TEST_URL}/${id}`);
  return response.data.data; // Assuming the API returns data in `data`
};
export const fetchTestPasscodeById = async (id: string): Promise<string> => {
  const response = await axios.get(API_TEST_URL);
  return response.data.data.passcode; // Assuming the passcode is in `data.passcode`
};
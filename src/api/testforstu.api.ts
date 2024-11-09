import { TestResult } from '../interface/testforstu';
import axios from 'axios';
const API_URL = 'https://bc5a5b6c-218e-4739-ace4-503d7eaacb3d.mock.pstmn.io/testg'; // Replace with your actual API URL

export const fetchTestResultById = async (id: number): Promise<TestResult> => {
  try {
    const response = await fetch(API_URL);
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const text = await response.text();
    console.log('Response body:', text);
    if (!text) {
      throw new Error('Response body is empty');
    }
    const data: TestResult = JSON.parse(text);
    console.log('Fetched data:', data); // Log the fetched data
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  } 
};

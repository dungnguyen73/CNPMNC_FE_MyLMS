import { TestResult } from '../interface/testforstu';
import axios from 'axios';

const API_URL = 'https://hoaqdzink.onrender.com/api/v1/student'; // Replace with your actual API URL
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0bXRodWF0IiwiZXhwIjoxNzMxMjg3Njc4LCJpYXQiOjE3MzExMTQ4NzgsIlVzZXJpZCI6IlNUMjE5NDAxIiwic2NvcGUiOiJTVFVERU5UIn0.S_fB45viPjlX-1CqYC486qfmACc6Om4QufdAapFO3F4_VbvGCOnSLW8wHikCDKp1zaCMxBOaSj01U7JvmZ-mJA';

export const fetchTestResultById = async (userId: string): Promise<TestResult[]> => {
  try {
    const response = await fetch(`${API_URL}/${userId}?userId=${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    console.log('Response body:', jsonResponse);
    if (!jsonResponse.data) {
      throw new Error('Response data is empty');
    }
    const data: TestResult[] = jsonResponse.data;

    console.log('Fetched data:', data); // Log the fetched data
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;

  }
};  


import axios from 'axios';
import { User } from '../types/user';

const apiUrl = 'https://75fbcf2e-9578-42e9-972f-80007010adfe.mock.pstmn.io/api/v1/user';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(apiUrl);
  return response.data.data; // Assuming the API returns data in `data`
};

export const addUser = async (user: User): Promise<User> => {
  const response = await axios.post(apiUrl, user);
  return response.data.data;
};

export const updateUser = async (user: User): Promise<void> => {
  await axios.put(`${apiUrl}/${user.id}`, user);
};

export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${apiUrl}/${id}`);
};
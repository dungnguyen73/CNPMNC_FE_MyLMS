import axios from 'axios';
import { User } from '../types/user';

const apiUrlGetAll = 'https://hoaqdzink.onrender.com/api/v1/users';
const apiUrlSingle = 'https://hoaqdzink.onrender.com/api/v1/user';

const token = localStorage.getItem('t');

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get(apiUrlGetAll);
  return response.data.data;
};

export const fetchUserById = async (id: string): Promise<User> => {
  const response = await axiosInstance.get(`${apiUrlSingle}/${id}`);
  return response.data.data;
};

export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await axiosInstance.post(apiUrlSingle, user);
  return response.data.data;
};

export const updateUser = async (user: User): Promise<void> => {
  await axiosInstance.put(`${apiUrlSingle}/${user.id}`, user);
};

export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${apiUrlSingle}/${id}`);
};

export const getMyAccount = async (): Promise<User> => {
  const response = await axiosInstance.get(`${apiUrlSingle}/my-account`);
  return response.data.data;
};

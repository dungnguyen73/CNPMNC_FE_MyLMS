import type { LoginParams } from '../interface/user/login';
import type { Dispatch } from '@reduxjs/toolkit';

import { apiLogin, apiLogout } from '../api/user.api';
import { setUserItem } from './user.store';
import { createAsyncAction } from './utils';
import axios from 'axios';
import { API_QUESTION_URL } from '@/api/question';
// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const loginAsync = createAsyncAction<LoginParams, boolean>(payload => {
  return async dispatch => {
    try {
      const response = await axios.post(`${API_QUESTION_URL}/login`, payload);
      const { accessToken, userResponse } = response.data.data; 

      if (accessToken) {
        localStorage.setItem('t', accessToken);
        localStorage.setItem('username', userResponse.username);
        localStorage.setItem('role', userResponse.role);

        dispatch(
          setUserItem({
            logged: true,
            username: userResponse.username,
          })
        );

        return true;
      }

      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };
});


export const logoutAsync = () => {
  return async (dispatch: Dispatch) => {
    const { status } = await apiLogout({ token: localStorage.getItem('t')! });

    if (status) {
      localStorage.clear();
      dispatch(
        setUserItem({
          logged: false,
        }),
      );

      return true;
    }

    return false;
  };
};

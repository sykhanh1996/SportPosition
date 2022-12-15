import env from 'react-dotenv';
import { api } from '../helpers';

const login = async (email: string, password: string) => {
    const body = { email, password };
    return await api.post('/v1/auth', body).then((response) => {
      return response.data;
    });
  };

  
export const mainService = {
  login,
};
import instance from './config';
import {RegisterData, LoginData} from '../interfaces/registerData';

const register = async (data: RegisterData): Promise<string> => {
    const response = await instance.post('/register/', data);
    return response.data;
};

const login = async (data: LoginData): Promise<string> => {
    const response = await instance.post('/login/', data);
    return response.data;
};

export {register, login};
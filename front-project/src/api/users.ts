import instance from './config';
import {RegisterData, LoginData} from '../interfaces/registerData';

const register = async (data: RegisterData): Promise<any> => {
    const response = await instance.post('/register/', data);
    return response;
};

const login = async (data: LoginData): Promise<any> => {
    const response = await instance.post('/login/', data);
    return response;
};

export {register, login};
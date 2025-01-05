import instance from './config';
import { AirportProps } from '../interfaces/airport';

const getAirports = async (token: string): Promise<[AirportProps]> => {
    const response = await instance.get('/airports/', {
        headers: {
            Authorization: `${token}`
        }
    });
    return response.data;
};

export {getAirports};
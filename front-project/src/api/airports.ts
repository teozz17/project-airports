import instance from './config';
import { AirportRequest } from '../interfaces/airportRequest';
import { AirportProps } from '../interfaces/airport';

const getAirports = async (token: string): Promise<any> => {
    const response = await instance.get('/airports/', {
        headers: {
            Authorization: `${token}`
        }
    });
    return response;
};

const addAirport = async (token: string, airport: AirportRequest ): Promise<any> => {
    const response = await instance.post('/airports/create/', airport, {
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response;
};

const updateAirport = async (token: string, airport: AirportProps ): Promise<any> => {
    if (!airport.id) {
        const response = await instance.put('/airports/update/', airport, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    } else {
        const response = await instance.put(`/airports/${airport.id}/update/`, airport, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
}

const deleteAirport = async (token: string, id: number): Promise<any> => {
    const response = await instance.delete(`/airports/${id}/delete/`, {
        headers: {
            Authorization: `${token}`
        }
    });
    return response;
}

const searchAirpotByICAOCode = async (token: string, icaoCode: string): Promise<any> => {
    const response = await instance.get(`/airports/${icaoCode}/`, {
        headers: {
            Authorization: `${token}`
        }
    });
    return response;
}


export {getAirports, addAirport, updateAirport, deleteAirport, searchAirpotByICAOCode};
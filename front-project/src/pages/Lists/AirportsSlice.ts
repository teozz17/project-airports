import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AirportProps } from '../../interfaces/airport';
import { getAirports, addAirport as addNewAirport, updateAirport as updateAirportApi, deleteAirport as deleteAirportApi} from '../../api/airports';
import { AirportRequest } from '../../interfaces/airportRequest';

const initialState = {
    airports: [] as AirportProps[],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed' 
    error: undefined as string | undefined
}

const token = localStorage.getItem('access_token') as string;

export const fetchAirports = createAsyncThunk<AirportProps[]>('airports/fetchAirports', async () => {
    try {
        const airports = await getAirports(token);
        return airports.data;
    } catch (error) {
        console.error(error);
        return [];
    }
})

export const addNewAirportFunc = createAsyncThunk<{ message: string; airport: AirportProps }, AirportRequest>(
    'airports/addNewAirport', 
    async (airport: AirportRequest) => {
        try {
            const response = await addNewAirport(token, airport); 
            return response.data;
        } catch (error: any) {
            console.error('Error adding new airport:', error);
            throw new Error('Something went wrong' );
        }
    }
);

export const updateAirportFunc = createAsyncThunk<{ message: string; airport: AirportProps }, AirportProps>(
    'airports/updateAirport',
    async (airport: AirportProps) => {
        try {
            const response = await updateAirportApi(token, airport);
            return response.data;
        } catch (error: any) {
            console.error('Error updating airport:', error);
            throw new Error('Something went wrong');
        }
    }
);

export const deleteAirportFunc = createAsyncThunk<{ message: string; id: number }, number>(
    'airports/deleteAirport',
    async (id: number) => {
        try {
            const response = await deleteAirportApi(token, id);
            return response.data;
        } catch (error: any) {
            console.error('Error fetchin airport:', error);
            throw new Error('Something went wrong');
        }
    }
);

const airportsSlice = createSlice({
    name: 'airports',
    initialState,
    reducers: {
        addAirport:{
            reducer: (state, action) => {
                state.airports.push(action.payload);
            },
            prepare: (name: string, icao: string, link: string, visited: boolean, description: string) => {
                return {
                    payload: {
                        id: Math.random().toString(36).substr(2, 9),
                        name,
                        icao,
                        link,
                        visited,
                        description
                    },
                    meta: undefined,
                    error: undefined
                };
            }
        },
        removeAirport: (state, action) => {
            state.airports = state.airports.filter(airport => airport.id !== action.payload);
        },
        updateAirport: (state, action) => {
            const { id, name, icao, link, visited, description } = action.payload;
            const existingAirport = state.airports.find(airport => airport.id === id);
            if (existingAirport) {
                existingAirport.name = name;
                existingAirport.icao = icao;
                existingAirport.link = link;
                existingAirport.visited = visited;
                existingAirport.description = description;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAirports.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAirports.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.airports = action.payload;
            })
            .addCase(fetchAirports.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewAirportFunc.fulfilled, (state, action) => {
                state.airports.push(action.payload.airport);
                console.log(action.payload);
            })
            .addCase(addNewAirportFunc.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(updateAirportFunc.fulfilled, (state, action) => {
                const { id, name, icao, link, visited, description } = action.payload.airport;
                const existingAirport = state.airports.find(airport => airport.id === id);
                if (existingAirport) {
                    existingAirport.name = name;
                    existingAirport.icao = icao;
                    existingAirport.link = link;
                    existingAirport.visited = visited;
                    existingAirport.description = description;
                } else {
                    state.airports.push(action.payload.airport);
                }
            })
            .addCase(updateAirportFunc.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(deleteAirportFunc.fulfilled, (state, action) => {
                state.airports = state.airports.filter(airport => airport.id !== action.payload.id);
            })
            .addCase(deleteAirportFunc.rejected, (state, action) => {
                state.error = action.error.message;
            })
    }
})

export const selectAllAirports = (state: any) => state.airports.airports;
export const getAirportsStatus = (state: any) => state.airports.status;
export const getAirportsError = (state: any) => state.airports.error;

export const { addAirport, removeAirport, updateAirport } = airportsSlice.actions;

export default airportsSlice.reducer;

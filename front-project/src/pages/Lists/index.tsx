import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Ariport from '../../components/Airport'
import './index.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AirportProps } from '../../interfaces/airport';
import { selectAllAirports, getAirportsStatus, fetchAirports} from './AirportsSlice';
import { ROUTES } from '../../assets/constants';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

const ListsPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const airports = useSelector(selectAllAirports);
    const [airportsFiltered, setAirportsFiltered] = useState<AirportProps[]>(airports);
    const airportsStatus = useSelector(getAirportsStatus);
    const [radioValue, setRadioValue] = useState('1');
    const actualUser = localStorage.getItem("access_token") as string;
    const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
    
    
    const radios = [
        { name: 'All', value: '1' },
        { name: 'Visited', value: '2' },
        { name: 'Not Visited', value: '3' },
    ];
    
    useEffect(() => {
        if(actualUser === null ) navigate(ROUTES.home);
    }, []);
    
     useEffect(() => {
         if (airportsStatus === 'idle' && token) {
            dispatch(fetchAirports() as any);
        }
    }, [airportsStatus, dispatch, token]);
    
    useEffect(() => {
        if (radioValue === '1') {
            setAirportsFiltered(airports);
        } else if (radioValue === '2') {
            setAirportsFiltered(airports.filter((airport: AirportProps) => airport.visited));
        } else if (radioValue === '3') {
            setAirportsFiltered(airports.filter((airport: AirportProps) => !airport.visited));
        }
    }, [radioValue, airports]);
    
    //To do: make a better loading and error handling
    if (airportsStatus === 'loading') {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    if (airportsStatus === 'failed') {
        return (
            <div className='error'>
                <h1>Error: re try</h1>
            </div>
        );
    }
    
    return (
        <div className='lists'>
            <ButtonGroup className="mb-2">
                {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
                ))}
            </ButtonGroup>
            <ul className="airports-container">
            {airportsFiltered.map((airport: AirportProps) => (
                <Link className='airports-container-link' to={`${airport.id}`} key={airport.id}>
                    <li className='airports-container-element'>
                        <Ariport airportView={{airport: airport, view: false}} />
                    </li>
                </Link>
            ))}
            </ul>
        </div>
    );
};

export default ListsPage;
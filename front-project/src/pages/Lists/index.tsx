import React from 'react';
import Ariport from '../../components/Airport'
import './index.scss'
import { Link } from 'react-router-dom';

const ListsPage: React.FC = () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4','Item 1', 'Item 2',];
    const airport2 = {
        id: 1,
        name: 'Mateo',
        link: 'mateo',
        icao: 'mateo',
        description: 'mateoooo',
        visited: true
    }

    const airportView = {
        airport: airport2,
        view: false,
    }

    return (
        <div className='lists'>
            <h1 className='lists-title'>Airports</h1>
            <ul className="airports-container">
            {items.map((item, index) => (
                <Link className='airports-container-link' to={`${index}`}>
                    <li className='airports-container-element' key={index}>
                        <Ariport key={airportView.airport.id} airportView={airportView} />
                    </li>
                </Link>
            ))}
            </ul>
        </div>
    );
};

export default ListsPage;
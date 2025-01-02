import React from 'react';
import Ariport from '../../components/Airport'
import './index.scss'

const ListsPage: React.FC = () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4','Item 1', 'Item 2',];
    const airport2 = {
        name: 'Mateo',
        link: 'mateo',
        icao: 'mateo',
        description: 'mateoooo',
        visited: true
    }

    return (
        <div className='lists'>
            <h1 className='lists-title'>Airports</h1>
            <ul className="airports-container">
            {items.map((item, index) => (
                <li className='airports-container-element' key={index}>
                <Ariport key={index} airport={airport2} />
                </li>
            ))}
            </ul>
        </div>
    );
};

export default ListsPage;
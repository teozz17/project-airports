import React from "react";
import { useParams } from "react-router";
import Airport from "../../components/Airport";
import { Link } from "react-router-dom";
import { ROUTES } from '../../assets/constants'
import './index.scss'

const AirportView: React.FC = () => {
  const index = useParams();
  const id = index?.id

  if (id === undefined) {
    return <p>Invalid airport index.</p>;
  }

  const airport2 = {
    name: 'Mateo',
    link: 'mateo',
    icao: 'mateo',
    description: 'mateoooo',
    visited: true
}

  const airportView = {
    airportView: {
      view: true,
      airport: airport2,
    },
  };

  return (
    <>
        <span className="span-back">
            <Link className="go-back" to={`/${ROUTES.favourites}`}>
                Back
            </Link>
        </span>
      <Airport {...airportView} />
    </>
  ); 
};

export default AirportView;

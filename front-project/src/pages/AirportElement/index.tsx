import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Airport from "../../components/Airport";
import { Link } from "react-router-dom";
import { ROUTES } from '../../assets/constants'
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import './index.scss'
import { AirportViewProps } from "../../interfaces/airportView";

const AirportView: React.FC = () => {
  const navigate = useNavigate();
  const index = useParams();
  const id = index?.id
  const actualUser = localStorage.getItem("access_token") as string;
  
      useEffect(() => {
          if(actualUser === null ) navigate(ROUTES.home);
      }, []);

  if (id === undefined) {
    return <p>Invalid airport index.</p>;
  }

  const airport = useSelector((state: RootState) =>
    state.airports.airports.find((airport) => airport.id === Number(id))
  );

  if (!airport) {
    
    return (
      <>
        <span className="span-back">
            <Link className="go-back" to={`/${ROUTES.favourites}`}>
                Back
            </Link>
        </span>
        <p>Airport not found.</p>
      </>
    );
  }

  const airportView : AirportViewProps = {
    airportView: {
      airport: airport,
      view: true
    }
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

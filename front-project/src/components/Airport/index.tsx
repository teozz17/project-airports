import React from "react"
import Card from 'react-bootstrap/Card';
import { AirportProps } from "../../interfaces/airport";

const Airport: React.FC<AirportProps> = (airport) => {
return (
    <Card border="info" style={{ width: '18rem', margin: '15px'}}>
        <Card.Header>{airport.airport.name}</Card.Header>
        <Card.Body>
          <Card.Title>{airport.airport.icao}</Card.Title>
          <Card.Text>
            {airport.airport.description}
          </Card.Text>
        </Card.Body>
      </Card>
)}

export default Airport;
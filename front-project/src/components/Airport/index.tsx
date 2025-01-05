import React from "react"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { AirportViewProps } from "../../interfaces/airportView";
import './index.scss'
import AirportEdit from "../AirportEdit";

const Airport: React.FC<AirportViewProps> = (airportView) => {

      const [modalShow, setModalShow] = React.useState(false);

return (
    <>
        {airportView.airportView.view && 
            <section className="card-airport-unique">
                <Card className="text-center">
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                    <Card.Body>
                        <Button className="m-2" variant="warning" onClick={() => setModalShow(true)}>Edit</Button>
                        <AirportEdit
                            show={modalShow} 
                            onHide={() => setModalShow(false)}
                            airport={airportView}
                        />
                        <Button className="m-2"variant="danger">Delete</Button>
                    </Card.Body>
                </Card>
            </section>
        }
        {!airportView.airportView.view && 
            <Card border="dark" style={{ width: '18rem'}}>
                <Card.Header>{airportView.airportView.airport.name}</Card.Header>
                <Card.Body>
                <Card.Title>{airportView.airportView.airport.icao}</Card.Title>
                <Card.Text>
                    {airportView.airportView.airport.description}
                </Card.Text>
                </Card.Body>
            </Card>
        }
    </>
)}

export default Airport;
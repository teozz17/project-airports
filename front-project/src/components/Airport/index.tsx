import React from "react"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { AirportViewProps } from "../../interfaces/airportView";
import './index.scss'
import AirportEdit from "../AirportEdit";
import { deleteAirportFunc } from "../../pages/Lists/AirportsSlice";
import { useDispatch } from "react-redux";
import ModalConfirmation from "../ModalConfirmation";

const Airport: React.FC<AirportViewProps> = (airportView) => {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = React.useState(false);
    const [modalConfirmation, setModalConfirmation] = React.useState(false);

    const airport = airportView.airportView.airport;

    const handleClick = async (id: any) => {
        const resultAction = await dispatch(deleteAirportFunc(id) as any).unwrap();
        console.log('Airport deleted:', resultAction);
    }
      

return (
    <>
        {airportView.airportView.view && 
            <section className="card-airport-unique">
                <Card className="text-center">
                    <Card.Header>{airport.name}</Card.Header>
                    <Card.Body>
                    <Card.Title>{airport.icao}</Card.Title>
                    <Card.Text>
                        {airport.description}
                    </Card.Text>
                    <Button 
                        href={airport.link} 
                        variant={airport.link == '' ? 'secondary' : 'primary'}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        disabled={airport.link == ''}
                    >
                        Link
                    </Button>
                    </Card.Body>
                    <Card.Footer className={airport.visited ? "text-success" : "text-danger"}>Id:{airport.id} {airport.visited ? <span>&#10003; visited</span>  :  <span>&#10539; not visited</span>}</Card.Footer>
                    <Card.Body>
                        <Button className="m-2" variant="warning" onClick={() => setModalShow(true)}>Edit</Button>
                        <AirportEdit
                            show={modalShow} 
                            onHide={() => setModalShow(false)}
                            airport={airportView}
                        />
                        <Button 
                            className="m-2"
                            variant="danger"
                            onClick={() => setModalConfirmation(true)}
                        >
                                Delete
                        </Button>
                        <ModalConfirmation 
                            show={modalConfirmation}
                            onHide={() => setModalConfirmation(false)}
                            func={() => handleClick(airport.id)}
                        >
                        </ModalConfirmation>
                    </Card.Body>
                </Card>
            </section>
        }
        {!airportView.airportView.view && 
            <Card border="dark" style={{ width: '18rem', height: '14rem' }}>
                <Card.Header>{airportView.airportView.airport.name}</Card.Header>
                <Card.Body>
                <Card.Title>{airportView.airportView.airport.icao}</Card.Title>
                <Card.Text>
                    {airportView.airportView.airport.description.slice(0, 100)}...
                </Card.Text>
                <Card.Footer className={airport.visited ? "text-success" : "text-danger"}>{airport.visited ? <span>&#10003; visited</span>  :  <span>&#10539; not visited</span>}</Card.Footer>
                </Card.Body>
            </Card>
        }
    </>
)}

export default Airport;
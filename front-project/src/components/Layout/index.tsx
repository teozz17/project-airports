import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './index.scss';
import { Outlet } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { Link, NavLink } from 'react-router-dom';
import {ROUTES} from '../../assets/constants'
import AirportEdit from '../AirportEdit';
import { AirportViewProps } from '../../interfaces/airportView';
import { AirportProps } from '../../interfaces/airport';

const Home: React.FC = () => {

  const [modalShow, setModalShow] = React.useState(false);

  const airport2 : AirportProps = {
      name: 'Mateo',
      link: 'mateo',
      icao: 'mateo',
      description: 'mateoooo',
      visited: true
}

const airportView : AirportViewProps = {
  airportView: {
    airport: airport2,
    view: false,
  }
}

    return (
        <div className='layout'>
          <section className='nav-bar'>
            <Navbar key={'nav'} expand={false} bg="dark" data-bs-theme="dark" className="bg-body-tertiary mb-3">
              <Container fluid>
                <Navbar.Brand as={NavLink} to={ROUTES.home}>
                <img className='logo' src={Logo} alt="Logo" />
                  Airport Atlas
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
                <Navbar.Offcanvas
                bg="dark" data-bs-theme="dark"
                id={`offcanvasNavbar-expand-${false}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
                placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                      Share your story
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link as={Link} to={ROUTES.home}>Home</Nav.Link>
                      <Nav.Link as={Link} to={ROUTES.create}>Create</Nav.Link>
                      <Nav.Link as={Link} to={ROUTES.favourites}>Airports</Nav.Link>
                      <span className='title-beta-version'>
                        BETA - Try our new functionality
                      </span>
                    </Nav>
                    <Form className="d-flex">
                      <Form.Control
                        type="search"
                        placeholder="ICAO Code (Only Germany)"
                        className="me-2"
                        aria-label="Search"
                        />
                      <AirportEdit
                            show={modalShow} 
                            onHide={() => setModalShow(false)}
                            airport={airportView}
                        />
                      <Button variant="outline-success" onClick={() => setModalShow(true)}>Search</Button>
                    </Form>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          </section>
          <section className='children'>
                  <Outlet />
          </section>
          <section className='footer-section'>
            <footer className='bg-dark py-5 mt-5'>
                  <div className='container text-light text-center'>
                      <p className='display-5 mb-3'>Airport Atlas</p>
                      <small>&copy; 2025</small><br />
                      <small>Add an airport and start sharing your future</small>
                  </div>
            </footer>
          </section>
        </div>
    );
};

export default Home;
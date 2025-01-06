import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './index.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { Link, NavLink } from 'react-router-dom';
import {ROUTES} from '../../assets/constants'
import AirportEdit from '../AirportEdit';
import { AirportProps } from '../../interfaces/airport';
import { searchAirpotByICAOCode } from '../../api/airports';
import { Spinner } from 'react-bootstrap';

const Home: React.FC = () => {
  
  const navigate = useNavigate();
  const [values, setValues] = useState<string>('');
  const [modalShow, setModalShow] = React.useState(false);
  const [userActive, setUserActive] = useState<boolean>(!!localStorage.getItem('access_token'));
  const [selectedAirport, setSelectedAirport] = useState<AirportProps | null>(null);
  const [loadingModal, setLoadingModal] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setUserActive(false);
            navigate(ROUTES.home);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setUserActive(false);
        navigate(ROUTES.home);
    };

    const hanleSearch = async (icaoCode: string) => {
      setLoadingModal(true);
        console.log('searching for:', icaoCode);
        const token = localStorage.getItem('access_token') as string; 
        const response = await searchAirpotByICAOCode(token, icaoCode);
        const data = response.data;
        const airport: AirportProps = {
          id: null,
          name: data.name,
          link: data.url,
          icao: data.ICAO,
          visited: false,
          description: '',
        }
        setSelectedAirport(airport);
        setModalShow(true);
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
                    {
                      userActive ?
                      <>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                          <Nav.Link as={Link} to={ROUTES.home}>Home</Nav.Link>
                          <Nav.Link as={Link} to={ROUTES.create}>Create</Nav.Link>
                          <Nav.Link as={Link} to={ROUTES.favourites}>Airports</Nav.Link>
                          <Nav.Link href={ROUTES.home} onClick={handleLogout}>Log out</Nav.Link>
                          <span className='title-beta-version'>
                            BETA - Try out the new functionality
                          </span>
                        </Nav>
                        <Form className="d-flex">
                          {!loadingModal && 
                          <>
                            <Form.Control
                              type="search"
                              placeholder="ICAO Code (Only Germany)"
                              className="me-2"
                              aria-label="Search"
                              onChange={(e) => setValues(e.target.value)}
                              />
                            <Button variant="outline-success" onClick={() => hanleSearch(values)}>Search</Button>
                          </>
                          }
                          {selectedAirport && (
                              <AirportEdit
                                  show={modalShow}
                                  onHide={() => {
                                    setModalShow(false);
                                    setLoadingModal(false);
                                  }}
                                  airport={{ airportView: { airport: selectedAirport, view: false } }}
                              />
                          )}
                          {loadingModal &&
                            <Spinner animation="border" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </Spinner>
                          }
                        </Form>
                      </> :
                      <>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                          <Nav.Link as={Link} to={ROUTES.home}>Home</Nav.Link>
                          <Nav.Link as={Link} to={ROUTES.login}>Login</Nav.Link>
                        </Nav>
                      </>
                    }
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
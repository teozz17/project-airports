import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './index.scss';
import { Outlet } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';

const Home: React.FC = () => {
    return (
        <div>
          <Navbar key={'nav'} expand={false} bg="dark" data-bs-theme="dark" className="bg-body-tertiary mb-3">
            <Container fluid>
              <Navbar.Brand href="/">
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
                    <Nav.Link href="#action1">Home</Nav.Link>
                    <Nav.Link href="#action2">Link</Nav.Link>
                    <NavDropdown
                      title="Dropdown"
                      id={`offcanvasNavbarDropdown-expand-${false}`}
                    >
                      <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Something else here
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
          <div>
                  <Outlet />
          </div>
          <footer className='bg-dark py-5 mt-5'>
                <div className='container text-light text-center'>
                    <p className='display-5 mb-3'>Airport Atlas</p>
                    <small>&copy; 2025</small><br />
                    <small>Add an airport and start sharing your future</small>
                </div>
          </footer>
        </div>
    );
};

export default Home;
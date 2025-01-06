import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { AirportViewProps } from '../../interfaces/airportView';
import { Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { updateAirportFunc } from '../../pages/Lists/AirportsSlice';
import { AirportProps } from '../../interfaces/airport';
import { useDispatch } from 'react-redux';

const AirportEdit = (props: { show: boolean, onHide: () => void , airport: AirportViewProps})  => {
    const { airport } = props.airport.airportView;
    const [form, setForm] = useState({
      name: airport.name,
      link: airport.link,
      icao: airport.icao,
      description: airport.description,
      visited: airport.visited
    });
    const [alert, setAlert] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [status, setStatus] = useState('false');
    const [updateAirportStatus, updateAddAirportStatus] = useState('idle');
    const dispatch = useDispatch();
    
    useEffect(() => {
      if (airport) {
          setForm({
              name: airport.name,
              link: airport.link,
              icao: airport.icao,
              description: airport.description,
              visited: airport.visited
          });
      }
    }, [airport]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm({
          ...form,
          [name]: value
      });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            setDisabled(true);  
            if (updateAirportStatus === 'idle') {
                event.preventDefault();
                const newAirport : AirportProps = {
                    ...form,
                    visited: status === 'true',
                    id: airport.id
                };
                try {
                    updateAddAirportStatus('loading');
                    const resultAction = await dispatch(updateAirportFunc(newAirport) as any).unwrap();
                    console.log('Airport added:', resultAction);
                    setAlert('Airport added successfully');
                    setStatus('false');
                    setTimeout(() => {
                      setAlert('');
                      setDisabled(false);
                      props.onHide();
                    }, 2000);
                } catch (error) {
                    console.error('Error adding new airport:', error);
                    setAlert('Failed to add airport. Remember to add Name and ICAO code of only 4 characters');
                    setDisabled(false);
                    setTimeout(() => {
                        setAlert('');
                    }, 4000);
                } finally {
                    updateAddAirportStatus('idle');
                }
            }
        };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Editing
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container mt-5 container mt-5">
            {alert && (
                <Alert variant={alert.includes('successfully') ? 'success' : 'danger'}>
                    {alert}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                    <Form.Control 
                        type="text" 
                        placeholder="John F. Kennedy International Airport" 
                        name='name'
                        value={form.name}
                        onChange={handleChange}    
                    />
                </FloatingLabel>

                <FloatingLabel controlId="floatingLink" label="Link" className="mb-3">
                    <Form.Control 
                        type="text" 
                        placeholder="https://www.jfkairport.com/" 
                        name='link'
                        value={form.link}
                        onChange={handleChange}    
                    />
                </FloatingLabel>
                
                <FloatingLabel controlId="floatingICAO" label="ICAO Code" className="mb-3">
                    <Form.Control 
                        type="text" 
                        placeholder="KJFK" 
                        name='icao'
                        value={form.icao}
                        onChange={handleChange}    
                    />
                </FloatingLabel>

                <Form.Select 
                  aria-label="Default select example" 
                  onChange={handleSelectChange}
                  defaultValue={airport.visited ? 'true' : 'false'}
                >
                  <option value="false">Pending to visit</option>
                  <option value="true">Visited</option>
                </Form.Select>
                <br/>
                
                <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
                    <Form.Control 
                        as="textarea" 
                        placeholder="Something" 
                        name='description'
                        value={form.description}
                        onChange={handleChange}
                    />
                </FloatingLabel>

                <button 
                  disabled={updateAirportStatus === 'loading' || disabled} 
                  type="submit" 
                  className={updateAirportStatus === 'loading' || disabled ? "btn btn-secondary" : "btn btn-warning"}
                >
                  Save
                </button>
            </Form>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default AirportEdit
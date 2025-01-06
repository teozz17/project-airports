import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { addNewAirportFunc } from '../Lists/AirportsSlice';
import { AirportRequest } from '../../interfaces/airportRequest';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../assets/constants';

const CreateAirport: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [status, setStatus] = useState('false');
    const [addAirportStatus, setAddAirportStatus] = useState('idle');
    const [disabled, setDisabled] = useState(false);
    const [alert, setAlert] = useState('');
    const actualUser = localStorage.getItem("access_token") as string;

    useEffect(() => {
        if(actualUser === null ) navigate(ROUTES.home);
    }, []);

    const [form, setForm] = useState({
        name: '',
        link: '',
        icao: '',
        visited: false,
        description: ''
    });

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
        if (addAirportStatus === 'idle') {
            event.preventDefault();
            const newAirport : AirportRequest = {
                ...form,
                visited: status === 'true'
            };
            try {
                setAddAirportStatus('loading');
                const resultAction = await dispatch(addNewAirportFunc(newAirport) as any).unwrap();
                console.log('Airport added:', resultAction);
                // Reset form
                setForm({
                    name: '',
                    link: '',
                    icao: '',
                    visited: false,
                    description: ''
                });
                setAlert('Airport added successfully');
                setStatus('false');
                setTimeout(() => {
                    setAlert('');
                    setDisabled(false);
                }, 2000);
            } catch (error) {
                setDisabled(false);
                console.error('Error adding new airport:', error);
                setAlert('Failed to add airport. Remember to add Name and ICAO code of only 4 characters');
                setTimeout(() => {
                    setAlert('');
                }, 4000);
            } finally {
                setAddAirportStatus('idle');
            }
        }
    };
    
    return (
        <div className="container mt-5 container mt-5">
            {alert && (
                <Alert variant={alert.includes('successfully') ? 'success' : 'danger'}>
                    {alert}
                </Alert>
            )}
            <h2>Create Airport</h2>
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
                    value={status} 
                    onChange={handleSelectChange}
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
                    disabled={addAirportStatus === 'loading' || disabled} 
                    type="submit" 
                    className={addAirportStatus === 'loading' || disabled ? "btn btn-secondary" : "btn btn-warning"}
                >
                    Submit
                </button>
            </Form>
        </div>
    );
};

export default CreateAirport;

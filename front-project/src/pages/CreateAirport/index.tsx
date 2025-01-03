import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const CreateAirport: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        link: '',
        icao: '',
        country: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', form);
    };

    return (
        <div className="container mt-5 container mt-5">
            <h2>Create Airport</h2>
            <Form>
                <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                    <Form.Control type="text" placeholder="John F. Kennedy International Airport" />
                </FloatingLabel>

                <FloatingLabel controlId="floatingLink" label="Link" className="mb-3">
                    <Form.Control type="text" placeholder="https://www.jfkairport.com/" />
                </FloatingLabel>
                
                <FloatingLabel controlId="floatingICAO" label="ICAO Code" className="mb-3">
                    <Form.Control type="text" placeholder="KJFK" />
                </FloatingLabel>

                <Form.Select aria-label="Default select example">
                    <option value="2">Pending to visit</option>
                    <option value="1">Visited</option>
                </Form.Select>
                <br/>
                
                <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
                    <Form.Control as="textarea" placeholder="Something" />
                </FloatingLabel>

                <button type="submit" className="btn btn-primary">Submit</button>
            </Form>
        </div>
    );
};

export default CreateAirport;
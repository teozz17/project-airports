import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { AirportViewProps } from '../../interfaces/airportView';

const AirportEdit = (props: { show: boolean, onHide: () => void , airport: AirportViewProps})  => {
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

            <button type="submit" className="btn btn-warning">Save</button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default AirportEdit
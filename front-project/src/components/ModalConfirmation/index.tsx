import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalConfirmation = (props: { show: boolean, onHide: () => void , func: () => void }) => {
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">
        Delete Airport
    </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <p>Are you sure about deletin this airport ?</p>
    </Modal.Body>
    <Modal.Footer>
    <Button onClick={props.onHide}>Close</Button>
    <Button variant="danger" onClick={() => props.func()}>Delete</Button>
    </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirmation;
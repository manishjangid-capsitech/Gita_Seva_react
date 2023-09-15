import { Button, Form, Modal } from "react-bootstrap";
import { useUser } from "../Contexts/UserContext";

interface IUserLoginDialogProps {
  onHide: () => void;
}

const UserLoginDialog = (props: IUserLoginDialogProps) => {
  const { setCurrentUser } = useUser();

  return (
    <Modal show onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Sign-in</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Check me out' />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => {
            props.onHide();
          }}>
          Close
        </Button>
        <Button
          variant='primary'
          onClick={() => {
            setCurrentUser({ id: "mukesh-id", name: "Mukesh Jangid" });
            props.onHide();
          }}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default UserLoginDialog;
import React from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './UserReducer';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      dispatch(addUser({ id: user[user.length - 1]?.id + 1 || 1, name, email }));
      setName('');
      setEmail('');
      navigate('/');
    } else {
      alert('Please fill in all fields!');
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <h1 className="mb-4">Add New User</h1>
      <Form className="" style={{ width: '50%' }} onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Attach onChange to Form.Control
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Attach onChange to Form.Control
            />
          </Col>
        </Form.Group>
        <Button type="submit" className="btn btn-info text-white">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Create;

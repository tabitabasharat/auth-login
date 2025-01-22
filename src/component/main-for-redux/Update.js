import React, { use, useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { updateUser } from "./UserReducer";
import { updateTask } from "../../lib/midleware/userdata";

function Update() {
  const { id } = useParams();
  const {loading, error, updateid} = useSelector((state) => state.edit);
  console.log("edit user data", updateid);
  const existingUser = updateid.filter((f) => f.id == (id));
  const { name, email } = existingUser[0];
  const [uname, setName] = useState(name);
  const [unemail, setEmail] = useState(email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
        if (name && email) {
          dispatch(updateTask({ 
            id: id,
            name:uname,
            email:unemail,
           }));
          setName('');
          setEmail('');
          navigate('/');
        } else {
          alert('Please fill in all fields!');
        }
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      <h1 className="mb-4">UpDate User</h1>
      <Form className="" style={{ width: "50%" }} onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName" >
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              value={uname}
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
              onChange={(e) => setEmail(e.target.value)}
              value={unemail}
            />
          </Col>
        </Form.Group>
    <Button type="submit" className="btn btn-info text-white">
          Update
        </Button>
      </Form>
    </div>
  );
}

export default Update;

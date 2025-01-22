import React from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "./UserReducer";

function Home() {
  const user = useSelector((state) => state.users);
  console.log("user data", user);
  const dispatch = useDispatch();
  const handledelete = (id) => {
  // id.preventDefault();
    dispatch(deleteUser({id:id}))

  }
  return (
    <div className="container d-flex flex-column justify-content-center align-items-start">
      <h1>crud app with JSON server</h1>
      <Link to="/create" className="btn btn-success my-3">create +</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/edit/${user.id}`} className="btn btn-primary btn-sm"> Edit</Link>
                <Button onClick={(e) => handledelete (user.id) } className="btn btn-danger ms-2 btn-sm"> Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;

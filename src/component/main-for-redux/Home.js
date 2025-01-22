import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "./UserReducer";
import { deleteTask, GetInfo } from "../../lib/midleware/userdata";

function Home() {
  const { loading, error, dataid } = useSelector((state) => state.userid);

  console.log("user data", dataid);
  const dispatch = useDispatch();
  const handledelete = (id) => {
    // id.preventDefault();
    dispatch(deleteTask(id));
    console.log("delete", id);
  };
  useEffect(() => {
    dispatch(GetInfo());
  }, [dispatch]);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-start">
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      <h1>crud app with JSON server</h1>
      <Link to="/create" className="btn btn-success my-3">
        create +
      </Link>
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
          {dataid.map((items, index) => (
            <tr key={index}>
              <td>{items.id}</td>
              <td>{items.name}</td>
              <td>{items.email}</td>
              <td>
                <Link
                  to={`/edit/${dataid.id}`}
                  className="btn btn-primary btn-sm"
                >
                  {" "}
                  Edit
                </Link>
                <Button
                  onClick={(e) => handledelete(items.id)}
                  className="btn btn-danger ms-2 btn-sm"
                >
                  {" "}
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;

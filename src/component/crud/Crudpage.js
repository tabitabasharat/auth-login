import React, { useEffect, useState } from "react";

function Crudpage() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/users");
//       const data = await res.json();
//       setUsers(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
//       setUsers(users.filter((user) => user.id !== id));
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };



  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <p>
            
        </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",  
          width: "100%",
        }}
      >
        <button>create</button>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <td>id</td>
              <td>name</td>
              <td>email</td>
              <td>action</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>asd</td>
              <td>dvfv</td>
              <td
                style={{ display: "flex", flexDirection: "colon", gap: "10px" }}
              >
                <button>edit</button>
                <button>remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Crudpage;

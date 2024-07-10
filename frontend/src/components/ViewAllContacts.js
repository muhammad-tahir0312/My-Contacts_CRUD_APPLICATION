import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewAllContacts = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const auth = localStorage.getItem("User");
  const token = JSON.parse(auth).token;

  const fetchData = async () => {
    const response = await fetch("https://my-contacts-backend-w86c.onrender.com/api/contacts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("error");
      return;
    }
    const result = await response.json();
    setData(result);
  };

  const handleClick = async (id)=>{
      navigate("/view_contact", { state: { id } });
  }

  const handleUpdate = async (id)=>{
    navigate("/update_contact", { state: { id } });
}

  const handleDelete = async (id) =>{
    const response = await fetch(`https://my-contacts-backend-w86c.onrender.com/api/contacts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("error deleting contact");
      return;
    }
    
    setData(data.filter((contact) => contact._id !== id));
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="ViewAllContacts">
      <h1>All Contacts</h1>

      {data ? (
        <>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Select</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {data.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.user_id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td> <button onClick={()=>{handleClick(contact._id)}}>Select</button> </td>
                  <td> <button onClick={()=>{handleDelete(contact._id)}}>Delete</button> </td>
                  <td> <button onClick={()=>{handleUpdate(contact._id)}}>Update</button> </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default ViewAllContacts;

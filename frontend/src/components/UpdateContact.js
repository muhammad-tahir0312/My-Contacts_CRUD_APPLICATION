import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UpdateContact = () => {
  const [data, setData] = useState({});
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const location = useLocation();

  const auth = localStorage.getItem("User");
  const token = JSON.parse(auth).token;
  const { id } = location.state || {};

  const ViewDetails = async () => {
    try {
      const response = await fetch(`https://my-contacts-backend-w86c.onrender.com/api/contacts/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.log("Error fetching contact details");
        return;
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching contact details:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://my-contacts-backend-w86c.onrender.com/api/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName, email: newEmail, phone: newPhone }),
      });
      if (!response.ok) {
        console.log("Failed to update contact");
        return;
      }
      console.log("Contact updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ViewDetails();
  });

  return (
    <div className="UpdateContact">
      <h1>Update Contact</h1>
      <h2>Current Details: </h2>

      {data ? (
        <>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr key={data._id}>
                <td>{data.user_id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <h2>Loading...</h2>
      )}

      <h2>Enter Updated Details: </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateContact;

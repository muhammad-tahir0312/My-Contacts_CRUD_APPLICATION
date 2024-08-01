import React, { useState } from 'react';

const CreateContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [createdContact, setCreatedContact] = useState(null); 

  const auth = localStorage.getItem("User");
  const token = auth ? JSON.parse(auth).token : null; 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/contacts", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, phone })
      });
      if (!response.ok) {
        throw new Error("Failed to create contact");
      }
      const data = await response.json();
      setCreatedContact(data.contacts);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create contact");
    }
  };

  return (
    <div className='createContact'>
      <h2>Create Contact</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {createdContact ? (
        <>
          <h1>Contact Details</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{createdContact.name}</td>
                <td>{createdContact.email}</td>
                <td>{createdContact.phone}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <h1></h1>
      )}
    </div>
  );
};

export default CreateContact;

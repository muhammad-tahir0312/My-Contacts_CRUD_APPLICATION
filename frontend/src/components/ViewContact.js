import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ViewContact = () => {
  const [data, setData] = useState(null);

  const location = useLocation();
  const { id } = location.state || {};

  const auth = localStorage.getItem("User");
  const token = auth ? JSON.parse(auth).token : null;

  const fetchData = async () => {
    try {
      const response = await fetch(`https://my-contacts-backend-w86c.onrender.com/api/contacts/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Error fetching contact");
        return;
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="contactDetails">
      <h1>Contact Details</h1>
      {data ? (
        <div className="contact-info">
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone:</strong> {data.phone}</p>
        </div>
      ) : (
        <p>No contact selected.</p>
      )}
    </div>
  );
};

export default ViewContact;

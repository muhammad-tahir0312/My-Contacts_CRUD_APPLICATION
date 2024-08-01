import React, { useEffect, useState } from 'react';
const asynchandler = require("express-async-handler")

const MyProfile = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const auth = localStorage.getItem("User")
    const token = JSON.parse(auth).token

    const handleUpdate = asynchandler( async () => {
        const response = await fetch('http://localhost:3000/api/users/current', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok) {
            console.error('Failed to fetch user data:', response.statusText);
            alert('Failed to fetch user data');
            return;
        }
        const userData = await response.json();
        setName(userData.name)
        setEmail(userData.email)

    })

    useEffect(()=>{
        handleUpdate();
    },[])

  return (
    <div className='myprofile'>
        <h1>MyProfile</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{name}</td>
                    <td>{email}</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default MyProfile;

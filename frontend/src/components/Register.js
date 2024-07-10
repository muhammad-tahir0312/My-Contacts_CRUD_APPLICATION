import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('User');
        if(auth){
            navigate("/");
        }
    }, [navigate]);

    const display = async () => {
        try {
            const response = await fetch('https://my-contacts-backend-w86c.onrender.com/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to register user:', errorData.message);
                alert('Registration failed: ' + errorData.message);
                return;
            }
    
            const result = await response.json();
            localStorage.setItem("User",JSON.stringify(result));
            navigate("/login");
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Error registering user');
        }
    };    

    return (
        <div className='register'>
            <h1>Register</h1>
            <input type="text" placeholder="Enter your name" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={display}>Register</button>
        <p>Have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Register;

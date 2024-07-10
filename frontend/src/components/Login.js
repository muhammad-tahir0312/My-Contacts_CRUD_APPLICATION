import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
        const auth = localStorage.getItem('User');
        if(auth){
            navigate("/");
        }
    }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:3001/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to login user:', errorData.message);
            alert('Login failed: ' + errorData.message);
            return;
        }
    
        const result = await response.json();
        localStorage.setItem("User",JSON.stringify(result));
        navigate("/");       
    } catch (error) {
        console.error('Failed to fetch data from the server', error);
        alert('Failed to fetch data from the server');
    }
};

  return (
    <div className="login">
      <h1>Login</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} type="submit">
          Login
        </button>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
